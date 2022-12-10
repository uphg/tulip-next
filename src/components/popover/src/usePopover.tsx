import { h, ref, type VNodeRef, nextTick, computed, watch, Teleport, Transition, type SetupContext, toRef, onMounted } from "vue"
import type { PopoverProps } from './popoverProps'
import { getRelativeDOMPosition } from '../../../utils'
import { useMaxZIndex } from '../../../composables/useMaxZIndex'

type UsePopoverOptions = {
  className?: string
}

const arrowHeight = 6
const popoverMargin = 8
const arrowMargin = 10

const arrowClassMap = [
  [['top-start', 'top', 'top-end'], 'top'],
  [['left-start', 'left', 'left-end'], 'left'],
  [['right-start', 'right', 'right-end'], 'right'],
  [['bottom-start', 'bottom', 'bottom-end'], 'bottom'],
]

export function usePopover(props: PopoverProps, context: Partial<SetupContext<'update:visible'[]>>, options?: UsePopoverOptions) {
  const className = options?.className
  const { getZIndex } = useMaxZIndex(window) || {}
  const on = {
    hover: { onMouseover },
    click: { onClick },
    focus: { onFocus: open, onBlur: close },
    manual: { },
  }[props.trigger]

  const visible = ref(false)
  const closeTimerId = ref<NodeJS.Timeout | null>(null)
  const hovered = ref(false)
  const mousedown = ref(false)
  const triggerRef = ref<VNodeRef | null>(null)
  const popoverRef = ref<VNodeRef | null>(null)
  const zIndex = ref(2000)
  const doc = ref({ top: 0, left: 0 })
  const popoverStyle = ref({})
  const arrowStyle = ref({})
  const arrowClass = ref({})
  const _placement = ref<PopoverProps['placement']>(props.placement)

  const triggerEl = computed(() => triggerRef.value.$el || triggerRef.value)
  const visiblePopover = computed(() => props.trigger === 'manual' ? props.visible : visible.value )

  props.trigger === 'manual' && watch(toRef(props, 'visible'), value => value ? open() : close())

  function open() {
    doc.value = getRelativeDOMPosition(triggerEl.value)
    zIndex.value = getZIndex?.() || 2000
    loadDomEventListener()
    updateVisible(true)
  }

  function close() {
    unloadDomEventListener()
    updateVisible(false)
  }

  function updateVisible(value: boolean) {
    props.trigger !== 'manual' && (visible.value = value)
    context?.emit?.('update:visible', value)
  }

  function isTrigger(event: MouseEvent) {
    const el = triggerEl.value
    return el && (el === event.target || el.contains(event.target))
  }

  function isPopover(event: MouseEvent) {
    const el = popoverRef.value
    return el && (el === event.target || el.contains(event.target))
  }

  function onMouseover() {
    hovered.value = true
    if (!visible.value) {
      // 进入
      open()
      nextTick(() => document.addEventListener('mouseover', handleDomMouseover))
    }
  }

  function onClick() {
    if (visible.value) {
      close()
    } else {
      open()
      nextTick(() => {
        document.addEventListener('mousedown', handleDomMousedown)
        document.addEventListener('mouseup', handleDomMouseup)
      })
    }
  }

  function handleDomMouseover(e: MouseEvent){
    isPopover(e) || isTrigger(e) ? handleHoverMoveIn() : handleHoverMoveOut()
  }

  function handleHoverMoveIn() {
    if (!closeTimerId.value) return
    window.clearTimeout(closeTimerId.value!)
    closeTimerId.value = null
    hovered.value = true
  }

  function handleHoverMoveOut() {
    if (!hovered.value) return
    if (visible.value) {
      closeTimerId.value = setTimeout(() => {
        if (closeTimerId.value) {
          closeTimerId.value = null
          document.removeEventListener('mouseover', handleDomMouseover)
          close()
        }
      }, 200)
    }
    hovered.value = false
  }

  function handleDomMousedown(event: MouseEvent) {
    if (isPopover(event)) return
    mousedown.value = true
  }

  function handleDomMouseup(event: MouseEvent) {
    if (!isTrigger(event) && !isPopover(event) && mousedown.value) {
      close()
      document.removeEventListener('mousedown', handleDomMousedown)
      document.removeEventListener('mouseup', handleDomMouseup)
    }
    if (mousedown.value) {
      mousedown.value = false
    }
  }

  function onEnter() {
    updatePlacement()
    updatePopoverStyle()
  } 

  function onAfterLeave() {
    popoverStyle.value = {}
    arrowStyle.value = {}
    arrowClass.value = {}
  }

  function updatePopoverStyle() {
    const style = getPopoverPosition(_placement.value)

    popoverStyle.value = {
      zIndex: zIndex.value || 2000,
      top: `${style.top}px`,
      left: `${style.left}px`
    }

    if (props.hideArrow || props.raw) return
    arrowClass.value = getArrowClass()
    arrowStyle.value = getArrowPosition()
  }

  function getPopoverToViewPosition(type: PopoverProps['placement']) {
    const style = getPopoverPosition(type)
    const { scrollTop, scrollLeft } = document.documentElement

    return {
      top: style.top - scrollTop,
      left: style.left - scrollLeft,
      bottom: document.documentElement.offsetHeight - (style.top - scrollTop + popoverRef.value.offsetHeight),
      right: document.documentElement.offsetWidth - (style.left - scrollLeft + popoverRef.value.offsetWidth),
    }
  }

  function getPopoverPosition(type: PopoverProps['placement']) {
    const trigger = triggerEl.value as HTMLElement
    const popover = popoverRef.value as HTMLElement
    const { top, left } = doc.value
    const topToTop = top - popover?.offsetHeight - popoverMargin
    const leftToLeft = left - popover?.offsetWidth - popoverMargin
    const rightToLeft = left + trigger?.offsetWidth + popoverMargin
    const bottomToTop = top + trigger?.offsetHeight + popoverMargin

    const placementMap = {
      'top-start': {
        top: topToTop,
        left: left
      },
      'top': {
        top: topToTop,
        left: left + trigger?.offsetWidth / 2 - popover?.offsetWidth / 2
      },
      'top-end': {
        top: topToTop,
        left: left + trigger?.offsetWidth - popover?.offsetWidth
      },
      'left-start': {
        top: top,
        left: leftToLeft
      },
      'left': {
        top: top + trigger?.offsetHeight / 2 - popover?.offsetHeight / 2 ,
        left: leftToLeft
      },
      'left-end': {
        top: top + trigger?.offsetHeight - popover?.offsetHeight ,
        left: leftToLeft
      },
      'right-start': {
        top: top,
        left: rightToLeft
      },
      'right': {
        top: top + trigger?.offsetHeight / 2 - popover?.offsetHeight / 2,
        left: rightToLeft
      },
      'right-end': {
        top: top + trigger?.offsetHeight - popover?.offsetHeight,
        left: rightToLeft
      },
      'bottom-start': {
        top: bottomToTop,
        left: left
      },
      'bottom': {
        top: bottomToTop,
        left: left + trigger?.offsetWidth / 2 - popover?.offsetWidth / 2
      },
      'bottom-end': {
        top: bottomToTop,
        left: left + trigger?.offsetWidth - popover?.offsetWidth
      }
    }

    return placementMap[type]
  }

  function getArrowPosition() {
    const { offsetWidth, offsetHeight } = popoverRef.value || { offsetHeight: 0, offsetWidth: 0 }
    switch(_placement.value) {
      case 'top-start':
        return { right: `${offsetWidth - arrowMargin}px` }
      case 'top':
        return { left: `${offsetWidth / 2 - arrowHeight}px` }
      case 'top-end':
        return { left: `${offsetWidth - 12 - arrowMargin}px` }
      case 'bottom-start':
        return { top: `-${arrowHeight}px`, right: `${offsetWidth - arrowMargin}px` }
      case 'bottom':
        return { top: `-${arrowHeight}px`, left: `${offsetWidth / 2 - arrowHeight}px` }
      case 'bottom-end':
        return { top: `-${arrowHeight}px`, left: `${offsetWidth - 12 - arrowMargin}px` }
      case 'left-start':
        return { bottom: `${offsetHeight - arrowMargin}px` }
      case 'left':
        return { top: `${offsetHeight / 2 - arrowHeight}px` }
      case 'left-end':
        return { top: `${offsetHeight - 12 - arrowMargin}px` }
      case 'right-start':
        return { left: `-${arrowHeight}px`, bottom: `${offsetHeight - arrowMargin}px` }
      case 'right':
        return { left: `-${arrowHeight}px`, top: `${offsetHeight / 2 - arrowHeight}px` }
      case 'right-end':
        return { left: `-${arrowHeight}px`, top: `${offsetHeight - 12 - arrowMargin}px` }
    }
  }

  function getArrowClass() {
    const type = arrowClassMap.find((item) => item[0].includes(_placement.value))?.[1]
    return { [`tu-popover-arrow--${type}`]: !!type }
  }

  function updatePlacement() {
    const { top, bottom, left, right } = getPopoverToViewPosition(props.placement)

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
        const middle = top + popoverRef.value.offsetHeight / 2 - triggerEl.value.offsetHeight / 2
        suffix = middle < 0 ? 'start' : ''
        changed = true
      }
      if (props.placement === 'left') {
        suffix = 'start'
        changed = true
      }

      // --- right
      if (props.placement === 'right-end') {
        const middle = top + popoverRef.value.offsetHeight / 2 - triggerEl.value.offsetHeight / 2
        suffix = middle < 0 ? 'start' : ''
        changed = true
      }
      if (props.placement === 'right') {
        suffix = 'start'
        changed = true
      }
    } else if (bottom > 0) {
      // --- top
      if (/^top.*/.test(props.placement) && /^bottom.*/.test(_placement.value)) {
        prefix = 'top'
        changed = true
      }

      // --- left
      if (props.placement === 'left-end' && _placement.value !== `${prefix}-end`) {
        suffix = 'end'
        changed = true
      }
      if (props.placement === 'left' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }

      // --- right
      if (props.placement === 'right-end' && _placement.value !== `${prefix}-end`) {
        suffix = 'end'
        changed = true
      }
      if (props.placement === 'right' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }
    }

    if (left < 0) {
      // --- top
      if (props.placement === 'top-end') {
        const middle = left + popoverRef.value.offsetWidth / 2 - triggerEl.value.offsetWidth / 2
        suffix = middle < 0 ? 'start' : ''
        changed = true
      }
      if (props.placement === 'top') {
        suffix = 'start'
        changed = true
      }

      // --- bottom
      if (props.placement === 'bottom-end') {
        const middle = left + popoverRef.value.offsetWidth / 2 - triggerEl.value.offsetWidth / 2
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
      if (props.placement === 'top' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }
      if (props.placement === 'top-end' && _placement.value !== `${prefix}-end`) {
        suffix = 'end'
        changed = true
      }

      // --- bottom
      if (props.placement === 'bottom' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }
      if (props.placement === 'bottom-end' && _placement.value !== `${prefix}-end`) {
        suffix = 'end'
        changed = true
      }

      // --- left
      if (/^left.*/.test(props.placement) && /^right.*/.test(_placement.value)) {
        prefix = 'left'
        changed = true
      }
    }

    if (right < 0) {
      // --- top
      if (props.placement === 'top-start') {
        const middle = right + popoverRef.value.offsetWidth / 2 - triggerEl.value.offsetWidth / 2
        suffix = middle < 0 ? 'end' : ''
        changed = true
      }
      if (props.placement === 'top') {
        suffix = 'end'
        changed = true
      }

      // --- bottom
      if (props.placement === 'bottom-start') {
        const middle = right + popoverRef.value.offsetWidth / 2 - triggerEl.value.offsetWidth / 2
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
      if (props.placement === 'top-start' && _placement.value !== `${prefix}-start`) {
        suffix = 'start'
        changed = true
      }
      if (props.placement === 'top' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }

      // --- bottom
      if (props.placement === 'bottom-start' && _placement.value !== `${prefix}-start`) {
        suffix = 'start'
        changed = true
      }
      if (props.placement === 'bottom' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }

      // --- right
      if (/^right.*/.test(props.placement) && /^left.*/.test(_placement.value)) {
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
        const middle = bottom + popoverRef.value.offsetHeight / 2 - triggerEl.value.offsetHeight / 2
        suffix = middle < 0 ? 'end' : ''
        changed = true
      }
      if (props.placement === 'left') {
        suffix = 'end'
        changed = true
      }

      // --- right
      if (props.placement === 'right-start') {
        const middle = bottom + popoverRef.value.offsetHeight / 2 - triggerEl.value.offsetHeight / 2
        suffix = middle < 0 ? 'end' : ''
        changed = true
      }
      if (props.placement === 'right') {
        suffix = 'end'
        changed = true
      }
    } else if (top > 0)  {
      // --- bottom
      if (/^bottom.*/.test(props.placement) && /^top.*/.test(_placement.value)) {
        prefix = 'bottom'
        changed = true
      }

      // --- left
      if (props.placement === 'left-start' && _placement.value !== `${prefix}-start`) {
        suffix = 'start'
        changed = true
      }
      if (props.placement === 'left' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }

      // --- right
      if (props.placement === 'right-start' && _placement.value !== `${prefix}-start`) {
        suffix = 'start'
        changed = true
      }
      if (props.placement === 'right' && _placement.value !== prefix) {
        suffix = ''
        changed = true
      }
    }

    if (changed) {
      _placement.value = (suffix ? `${prefix}-${suffix}` : prefix) as PopoverProps['placement']
      updatePopoverStyle()
    }
  }

  function loadDomEventListener() {
    document.addEventListener('scroll', updatePlacement)
    window.addEventListener('resize', updatePlacement)
  }

  function unloadDomEventListener() {
    document.removeEventListener('scroll', updatePlacement)
    window.removeEventListener('resize', updatePlacement)
  }

  return {
    render: () => [
      context.slots?.default && h(context.slots.default?.()[0], { ref: triggerRef, ...on }),
      props.disabled ? null : (
        <Teleport to="body">
          <Transition onEnter={onEnter} onAfterLeave={onAfterLeave} name="tu-zoom">
            {{
              default: () => visiblePopover.value ? (
                props.raw
                  ? context.slots?.content
                    && (
                      <div
                        class="tu-popover"
                        ref={popoverRef}
                        style={popoverStyle.value}
                        {...context.attrs}
                      >
                        {context.slots?.content?.({ close })}
                      </div>
                    )
                  : <div
                      class={['tu-popover tu-popover--default', { [className!]: !!className }]}
                      ref={popoverRef}
                      style={popoverStyle.value}
                      {...context.attrs}
                    >
                      <div class="tu-popover__content">{props.content || context.slots?.content?.({ close })}</div>
                      {props.hideArrow ? null : (
                        <div class={['tu-popover-arrow-wrapper', arrowClass.value]} style={arrowStyle.value}>
                          <div class="tu-popover-arrow"></div> 
                        </div>
                      )}
                    </div>
              ) : null
            }}
          </Transition>
        </Teleport>
      )
    ]
  }
}