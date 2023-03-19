import { computed, createApp, defineComponent, h, onMounted, onBeforeUnmount, ref, shallowRef, toRef, Transition, watch, type App, type Ref } from 'vue'
import { popupProps, type PopupProps, type UpdatePopupStyle } from './props'
import zindexable, { updateZIndex } from './zindexble'
import { getRelativeDOMPosition, getScrollParent, toNumber, withAttrs, on, off, toPx, type GetScrollParentNode } from '../../../utils'
import { ensureViewBoundingRect } from '../../../utils/viewMeasurer'
import type { ElementStyle, Fn, VueInstance } from '../../../types'
import { unrefElement } from '../../../composables/unrefElement'
import { useMutationObserver } from '../../../composables/useMutationObserver'
import { useResize } from '../../../composables/useResize'

const transformOriginMap = {
  'top-start': 'bottom left',
  'top': 'bottom',
  'top-end': 'bottom right',

  'left-start': 'top right',
  'left': 'right',
  'left-end': 'bottom right',

  'right-start': 'top left',
  'right': 'left',
  'right-end': 'bottom left',

  'bottom-start': 'top left',
  'bottom': 'top',
  'bottom-end': 'top right'
}

const Popup = defineComponent({
  name: 'TuPopup',
  inheritAttrs: false,
  props: popupProps,
  emits: ['update:visible'],
  setup(props, context) {
    const popup = shallowRef<HTMLElement | null>(null)
    const triggerEl = shallowRef<HTMLElement | VueInstance | null>(null)
    const container = shallowRef<HTMLElement | null>(null)

    const containerApp = ref<App<Element> | null>(null)
    const domPosition = ref({ top: 0, left: 0 })
    const popupStyle = ref<UpdatePopupStyle & ElementStyle>({})
    const rawPlacement = ref<PopupProps['placement']>(props.placement)
    const initialize = ref(false)
    const trigger = computed(() => unrefElement(triggerEl as Ref<HTMLElement>))

    let scrollableNodes: Array<Element | Document> = [] // p, div, document

    watch(toRef(props, 'visible'), value => {
      value ? handleOpen() : handleClose()
    })

    function handleOpen() {
      initialize.value ? handleOpenPopup() : initPopup()
    }

    function handleClose() {
      unloadScrollListener()
      unloadResizeListener()
    }

    function handleOpenPopup() {
      updateZIndex(container.value!)
      domPosition.value = getRelativeDOMPosition(trigger.value)
      loadScrollListener()
      loadResizeListener()
    }

    function initPopup() {
      const div = document.createElement('div')
      div.className = 'tu-popup-container'
      container.value = div
      document.body.appendChild(div)

      containerApp.value = createApp({
        setup() {
          const visible = ref(false)
          const stopWatchHandle = watch(toRef(props, 'visible'), (value) => {
            visible.value = value!
          })

          onMounted(() => {
            visible.value = props.visible!
            handleOpenPopup()
          })

          onBeforeUnmount(stopWatchHandle)
          return () => props.disabled ? null : (
            <Transition
              name="tu-zoom"
              onBeforeEnter={props.onBeforeEnter}
              onEnter={handleEnter}
              onAfterEnter={props.onAfterEnter}
              onEnterCancelled={props.onEnterCancelled}
              onBeforeLeave={props.onBeforeLeave}
              onLeave={props.onLeave}
              onAfterLeave={handleAfterLeave}
              onLeaveCancelled={props.onLeaveCancelled}
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

      containerApp.value.mount(div)
      zindexable.elementZIndex.set(div, zindexable.nextZIndex)
      initialize.value = true
    }

    function handleEnter(el: Element, done: Fn) {
      updatePosition()
      props.onEnter?.(el, done)
    } 
  
    function handleAfterLeave(el: Element) {
      popupStyle.value = {}
      props.onAfterLeave?.(el)
    }

    function handleScroll() {
      domPosition.value = getRelativeDOMPosition(trigger.value)
      updatePosition()
    }

    function updatePosition() {
      if (!props.visible) return
      updatePopupStyle()
      updateRawPlacement()
    }

    function updatePopupStyle() {
      if (!trigger.value) return
      const width = props.width === 'trigger' ? trigger.value.offsetWidth : props.width
      const style = getPopupPosition(rawPlacement.value, { width })

      popupStyle.value = {
        width: toPx(width),
        top: toPx(style.top),
        left: toPx(style.left),
        transformOrigin: transformOriginMap[rawPlacement.value]
      }

      props.onUpdateStyle?.(popupStyle.value)
    }
  
    function updateRawPlacement() {
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
  
    function getPopupPosition(type: PopupProps['placement'], options?: { width?: string | number }) {
      const popupMargin = toNumber(props.popupMargin)
      const { top: domTop, left: domLeft } = domPosition.value
      const { offsetHeight: triggerHeight, offsetWidth: triggerWidth } = withAttrs(trigger.value)
      const { offsetHeight: popupHeight } = withAttrs(popup.value)
      const popupWidth = Number(options?.width ?? withAttrs(popup.value).offsetWidth)
  
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
  
    function handleDomResize() {
      domPosition.value = getRelativeDOMPosition(trigger.value)
      updatePosition()
    }

    function loadScrollListener() {
      let scrollNode: GetScrollParentNode = trigger.value as HTMLElement
      while (true) {
        scrollNode = getScrollParent(scrollNode)
        if (scrollNode === null) break
        scrollableNodes.push(scrollNode)
      }
      for (const el of scrollableNodes) {
        on(el, 'scroll', handleScroll)
      }
    }

    function unloadScrollListener() {
      for (const el of scrollableNodes) {
        off(el, 'scroll', handleScroll)
      }
      scrollableNodes = []
    }

    function loadResizeListener() {
      on(window, 'resize', handleDomResize)
    }

    function unloadResizeListener() {
      off(window, 'resize', handleDomResize)
    }

    useResize(trigger, handleDomResize)

    onBeforeUnmount(() => {
      if (container.value) {
        zindexable.elementZIndex.delete(container.value)
        containerApp.value!.unmount()
      }
    })

    context.expose({ updatePosition, rawPlacement, popup, trigger })

    return () => context.slots?.trigger && h(context.slots.trigger?.()[0], { ref: triggerEl })
  }
})

export default Popup
