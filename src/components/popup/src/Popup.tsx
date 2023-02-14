import { computed, createApp, defineComponent, h, onMounted, onUnmounted, ref, shallowRef, toRef, Transition, watch, watchEffect, type App } from 'vue'
import { popupProps, type PopupProps, type UpdatePopupStyle } from './popupProps'
import zindexable, { updateZIndex } from './zindexble'
import { getRelativeDOMPosition, toNumber, withAttrs, on, off, toPx } from '../../../utils'
import { ensureViewBoundingRect } from '../../../utils/viewMeasurer'
import type { Fn, VueInstance } from '../../../types'
import { unrefElement } from '../../../composables/unrefElement'

const Popup = defineComponent({
  name: 'TuPopup',
  inheritAttrs: false,
  props: popupProps,
  emits: ['update:visible'],
  setup(props, context) {
    const popup = shallowRef<HTMLElement | null>(null)
    const triggerEl = shallowRef<HTMLElement | VueInstance | null>(null)
    const foothold = shallowRef<HTMLElement | null>(null)
    const footholdApp = ref<App<Element> | null>(null)
    
    const dom = ref({ top: 0, left: 0 })
    const popupStyle = ref<UpdatePopupStyle>({})
    const rawPlacement = ref<PopupProps['placement']>(props.placement)
    const initialize = ref(false)
    const trigger = computed(() => unrefElement(triggerEl))

    let scrollableNodes: Array<Element | Document> = [] // p, div, document

    watch(toRef(props, 'visible'), value => {
      value ? handleOpen() : handleClose()
    })

    function handleOpen() {
      initialize.value ? handleOpenPopup() : initPopup()
    }

    function initPopup() {
      const div = document.createElement('div')
      div.className = 'tu-foothold'
      foothold.value = div
      document.body.appendChild(div)

      footholdApp.value = createApp({
        setup() {
          const visible = ref(false)
          const stopWatchHandle = watch(toRef(props, 'visible'), (value) => {
            visible.value = value!
          })

          onMounted(() => {
            visible.value = props.visible!
            handleOpenPopup()
          })

          onUnmounted(stopWatchHandle)
          return () => props.disabled ? null : (
            <Transition
              onBeforeEnter={props.onBeforeEnter}
              onEnter={handleEnter}
              onAfterEnter={props.onAfterEnter}
              onEnterCancelled={props.onEnterCancelled}
              onBeforeLeave={props.onBeforeLeave}
              onLeave={props.onLeave}
              onAfterLeave={handleAfterLeave}
              onLeaveCancelled={props.onLeaveCancelled}
              name="tu-zoom"
            >
              {{
                default: () => (
                  visible.value ? (
                    <div
                      class="tu-popup"
                      ref={popup}
                      style={popupStyle.value}
                      {...context.attrs}
                    >
                      {context.slots?.default?.()}
                    </div>
                  ) : null
                )
              }}
            </Transition>
          )
        }
      })

      footholdApp.value.mount(div)
      zindexable.elementZIndex.set(div, zindexable.nextZIndex)
      initialize.value = true
    }

    function handleOpenPopup() {
      updateZIndex(foothold.value!)
      dom.value = getRelativeDOMPosition(trigger.value)
      loadScrollListener()
      loadResizeListener()
    }

    function handleClose() {
      unloadScrollListener()
      unloadResizeListener()
    }

    function handleEnter(el: Element, done: Fn) {
      updatePosition()
      props.onEnter?.(el, done)
    } 
  
    function handleAfterLeave(el: Element) {
      popupStyle.value = {}
      props.onAfterLeave?.(el)
    }

    function getPopupToViewPosition(type: PopupProps['placement']) {
      const style = getPopupPosition(type)
      const { scrollTop, scrollLeft } = document.documentElement
      const { width: viewWidth, height: viewHeight } = ensureViewBoundingRect()
      const { offsetHeight: popupHeight, offsetWidth: popupWidth } = withAttrs(popup.value)
  
      return {
        top: style.top - scrollTop,
        left: style.left - scrollLeft,
        right: viewWidth - (style.left - scrollLeft + popupWidth),
        bottom: viewHeight - (style.top - scrollTop + popupHeight),
      }
    }
  
    function getPopupPosition(type: PopupProps['placement'], options?: { width: number }) {
      const popupMargin = toNumber(props.popupMargin)
      const { top: domTop, left: domLeft } = dom.value
      const { offsetHeight: triggerHeight, offsetWidth: triggerWidth } = withAttrs(trigger.value)
      const { offsetHeight: popupHeight } = withAttrs(popup.value)
      const popupWidth = options?.width ?? withAttrs(popup.value).offsetWidth
  
      const topToTop = domTop - popupHeight - popupMargin
      const leftToLeft = domLeft - popupWidth - popupMargin
      const bottomToTop = domTop + triggerHeight + popupMargin
      const rightToLeft = domLeft + triggerWidth + popupMargin
  
      const placementMap = {
        'top-start': {
          top: topToTop,
          left: domLeft
        },
        'top': {
          top: topToTop,
          left: domLeft + triggerWidth / 2 - popupWidth / 2
        },
        'top-end': {
          top: topToTop,
          left: domLeft + triggerWidth - popupWidth
        },
        'left-start': {
          top: domTop,
          left: leftToLeft
        },
        'left': {
          top: domTop + triggerHeight / 2 - popupHeight / 2 ,
          left: leftToLeft
        },
        'left-end': {
          top: domTop + triggerHeight - popupHeight ,
          left: leftToLeft
        },
        'right-start': {
          top: domTop,
          left: rightToLeft
        },
        'right': {
          top: domTop + triggerHeight / 2 - popupHeight / 2,
          left: rightToLeft
        },
        'right-end': {
          top: domTop + triggerHeight - popupHeight,
          left: rightToLeft
        },
        'bottom-start': {
          top: bottomToTop,
          left: domLeft
        },
        'bottom': {
          top: bottomToTop,
          left: domLeft + triggerWidth / 2 - popupWidth / 2
        },
        'bottom-end': {
          top: bottomToTop,
          left: domLeft + triggerWidth - popupWidth
        }
      }
  
      return placementMap[type]
    }

    function updatePopupStyle() {
      const width = props.width === 'trigger' ? trigger.value.offsetWidth : props.width
      const style = getPopupPosition(rawPlacement.value, { width })
      popupStyle.value = {
        width: toPx(width),
        top: `${style.top}px`,
        left: `${style.left}px`
      }

      props.onUpdateStyle?.(popupStyle.value)
    }
  
    function updatePlacement() {
      const { top, bottom, left, right } = getPopupToViewPosition(props.placement)
      const { offsetWidth: popupWidth, offsetHeight: popupHeight } = withAttrs(popup.value) 
      const { offsetWidth: triggerWidth, offsetHeight: triggerHeight } = withAttrs(trigger.value) 
  
      let prefix = props.placement.replace(/-[a-z]*$/, '')
      let suffix = /-start$/.test(props.placement)
        ? 'start'
        : /-end$/.test(props.placement)
          ? 'end'
          : ''
  
      let changed = false
      if (top < 0) {
        // --- top
        if (/^top.*/.test(props.placement)) {
          prefix = 'bottom'
          changed = true
        }
  
        // --- left
        if (props.placement === 'left-end') {
          const middle = top + popupHeight / 2 - triggerHeight / 2
          suffix = middle < 0 ? 'start' : ''
          changed = true
        }
        if (props.placement === 'left') {
          suffix = 'start'
          changed = true
        }
  
        // --- right
        if (props.placement === 'right-end') {
          const middle = top + popupHeight / 2 - triggerHeight / 2
          suffix = middle < 0 ? 'start' : ''
          changed = true
        }
        if (props.placement === 'right') {
          suffix = 'start'
          changed = true
        }
      } else if (bottom > 0) {
        // --- top
        if (/^top.*/.test(props.placement) && /^bottom.*/.test(rawPlacement.value)) {
          prefix = 'top'
          changed = true
        }
  
        // --- left
        if (props.placement === 'left-end' && rawPlacement.value !== `${prefix}-end`) {
          suffix = 'end'
          changed = true
        }
        if (props.placement === 'left' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
  
        // --- right
        if (props.placement === 'right-end' && rawPlacement.value !== `${prefix}-end`) {
          suffix = 'end'
          changed = true
        }
        if (props.placement === 'right' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
      }
  
      if (left < 0) {
        // --- top
        if (props.placement === 'top-end') {
          const middle = left + popupWidth / 2 - triggerWidth / 2
          suffix = middle < 0 ? 'start' : ''
          changed = true
        }
        if (props.placement === 'top') {
          suffix = 'start'
          changed = true
        }
  
        // --- bottom
        if (props.placement === 'bottom-end') {
          const middle = left + popupWidth / 2 - triggerWidth / 2
          suffix = middle < 0 ? 'start' : ''
          changed = true
        }
        if (props.placement === 'bottom') {
          suffix = 'start'
          changed = true
        }
  
        // --- left
        if (/^left.*/.test(props.placement)) {
          prefix = 'right'
          changed = true
        }
      } else if (right > 0) {
        // --- top
        if (props.placement === 'top' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
        if (props.placement === 'top-end' && rawPlacement.value !== `${prefix}-end`) {
          suffix = 'end'
          changed = true
        }
  
        // --- bottom
        if (props.placement === 'bottom' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
        if (props.placement === 'bottom-end' && rawPlacement.value !== `${prefix}-end`) {
          suffix = 'end'
          changed = true
        }
  
        // --- left
        if (/^left.*/.test(props.placement) && /^right.*/.test(rawPlacement.value)) {
          prefix = 'left'
          changed = true
        }
      }
  
      if (right < 0) {
        // --- top
        if (props.placement === 'top-start') {
          const middle = right + popupWidth / 2 - triggerWidth / 2
          suffix = middle < 0 ? 'end' : ''
          changed = true
        }
        if (props.placement === 'top') {
          suffix = 'end'
          changed = true
        }
  
        // --- bottom
        if (props.placement === 'bottom-start') {
          const middle = right + popupWidth / 2 - triggerWidth / 2
          suffix = middle < 0 ? 'end' : ''
          changed = true
        }
        if (props.placement === 'bottom') {
          suffix = 'end'
          changed = true
        }
  
        // --- right
        if (/^right.*/.test(props.placement)) {
          prefix = 'left'
          changed = true
        }
      } else if (left > 0) {
        // --- top
        if (props.placement === 'top-start' && rawPlacement.value !== `${prefix}-start`) {
          suffix = 'start'
          changed = true
        }
        if (props.placement === 'top' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
  
        // --- bottom
        if (props.placement === 'bottom-start' && rawPlacement.value !== `${prefix}-start`) {
          suffix = 'start'
          changed = true
        }
        if (props.placement === 'bottom' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
  
        // --- right
        if (/^right.*/.test(props.placement) && /^left.*/.test(rawPlacement.value)) {
          prefix = 'right'
          changed = true
        }
      }
  
      if (bottom < 0) {
        // --- bottom
        if (/^bottom.*/.test(props.placement)) {
          prefix = 'top'
          changed = true
        }
  
        // --- left
        if (props.placement === 'left-start') {
          const middle = bottom + popupHeight / 2 - triggerHeight / 2
          suffix = middle < 0 ? 'end' : ''
          changed = true
        }
        if (props.placement === 'left') {
          suffix = 'end'
          changed = true
        }
  
        // --- right
        if (props.placement === 'right-start') {
          const middle = bottom + popupHeight / 2 - triggerHeight / 2
          suffix = middle < 0 ? 'end' : ''
          changed = true
        }
        if (props.placement === 'right') {
          suffix = 'end'
          changed = true
        }
      } else if (top > 0)  {
        // --- bottom
        if (/^bottom.*/.test(props.placement) && /^top.*/.test(rawPlacement.value)) {
          prefix = 'bottom'
          changed = true
        }
  
        // --- left
        if (props.placement === 'left-start' && rawPlacement.value !== `${prefix}-start`) {
          suffix = 'start'
          changed = true
        }
        if (props.placement === 'left' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
  
        // --- right
        if (props.placement === 'right-start' && rawPlacement.value !== `${prefix}-start`) {
          suffix = 'start'
          changed = true
        }
        if (props.placement === 'right' && rawPlacement.value !== prefix) {
          suffix = ''
          changed = true
        }
      }
  
      if (changed) {
        rawPlacement.value = (suffix ? `${prefix}-${suffix}` : prefix) as PopupProps['placement']
        updatePopupStyle()
      }
    }
  
    function handleDomResize() {
      dom.value = getRelativeDOMPosition(trigger.value)
      updatePosition()
    }

    function loadScrollListener() {
      let scrollNode: Element | Document | null = trigger.value
      while (true) {
        scrollNode = getScrollParent(scrollNode)
        if (scrollNode === null) break
        scrollableNodes.push(scrollNode)
      }
      for (const el of scrollableNodes) {
        on(el, 'scroll', onScroll)
      }
    }

    function unloadScrollListener() {
      for (const el of scrollableNodes) {
        off(el, 'scroll', onScroll)
      }
      scrollableNodes = []
    }

    function loadResizeListener() {
      on(window, 'resize', handleDomResize)
    }

    function unloadResizeListener() {
      off(window, 'resize', handleDomResize)
    }

    function onScroll() {
      dom.value = getRelativeDOMPosition(trigger.value)
      updatePosition()
    }

    function updatePosition() {
      updatePopupStyle()
      updatePlacement()
    }

    onUnmounted(() => {
      if (foothold.value) {
        zindexable.elementZIndex.delete(foothold.value)
        footholdApp.value!.unmount()
      }
    })

    context.expose({ updatePosition, rawPlacement, popup, trigger })

    return () => context.slots?.trigger && h(context.slots.trigger?.()[0], { ref: triggerEl })
  }
})

const reOverflowScroll = /(auto|scroll|overlay)/

function getParentNode(node: Node): Node | null {
  // document type === 9
  return node.nodeType === 9 ? null : node.parentNode
}

function getScrollParent(node: Node | null): HTMLElement | Document | null {
  if (node === null) return null

  const parentNode = getParentNode(node) as HTMLElement

  if (parentNode === null) {
    return null
  }

  if (parentNode.nodeType === 9) {
    return document
  }

  if (parentNode?.nodeType === 1) {
    const { overflow, overflowX, overflowY } = getComputedStyle(parentNode)    
    if (reOverflowScroll.test(overflow + overflowX + overflowY)) {
      return parentNode
    }
  }

  return getScrollParent(parentNode)
}

export default Popup