import {  h, ref, type VNodeRef, nextTick, computed, Teleport, Transition, type SetupContext } from "vue"
import { getClientRect } from "../../../utils"
import type { PopoverProps } from './popoverProps'

const arrowClassMap = [
  [['top-start', 'top', 'top-end'], 'top'],
  [['left-start', 'left', 'left-end'], 'left'],
  [['right-start', 'right', 'right-end'], 'right'],
  [['bottom-start', 'bottom', 'bottom-end'], 'bottom'],
]

export function usePopover(props: PopoverProps, context: SetupContext<{}>) {
  const visible = ref(false)
  const triggerStyle = ref<{ left: number, top: number }>({ left: 0, top: 0 })
  const closeTimerId = ref<NodeJS.Timeout | null>(null)
  const mousedown = ref(false)
  const triggerRef = ref<VNodeRef | null>(null)
  const popoverRef = ref<VNodeRef | null>(null)

  const visiblePopover = computed(() => props.visible !== void 0 ? props.visible : visible.value )
  const halfWidth = computed(() => (popoverRef.value?.offsetWidth || 0) / 2)
  const halfHeight = computed(() => (popoverRef.value?.offsetHeight || 0) / 2)

  const style = computed(() => {
    const { top, left } = triggerStyle.value
    const topToTop = `${top - (popoverRef.value?.offsetHeight || 0) - 8}px`
    const leftToLeft = `${left - popoverRef.value?.offsetWidth - 8}px`
    const rightToLeft = `${left + 8}px`
    const bottomToTop = `${top + 8}px`

    const styleMap = {
      'top-start': {
        top: topToTop,
        left: `${left}px`
      },
      'top': {
        top: topToTop,
        left: `${left - halfWidth.value}px`
      },
      'top-end': {
        top: topToTop,
        left: `${left - popoverRef.value?.offsetWidth}px`
      },
      'left-start': {
        top: `${top}px`,
        left: leftToLeft
      },
      'left': {
        top: `${top - halfHeight.value}px`,
        left: leftToLeft
      },
      'left-end': {
        top: `${top - popoverRef.value?.offsetHeight}px`,
        left: leftToLeft
      },
      'right-start': {
        top: `${top}px`,
        left: rightToLeft
      },
      'right': {
        top: `${top - halfHeight.value}px`,
        left: rightToLeft
      },
      'right-end': {
        top: `${top - popoverRef.value?.offsetHeight}px`,
        left: rightToLeft
      },
      'bottom-start': {
        top: bottomToTop,
        left: `${left}px`
      },
      'bottom': {
        top: bottomToTop,
        left: `${left - halfWidth.value}px`
      },
      'bottom-end': {
        top: bottomToTop,
        left: `${left - popoverRef.value?.offsetWidth}px`
      },
    }

    return styleMap[props.placement]
  })

  const arrowStyle = computed(() => {
    switch(props.placement) {
      case 'top-start':
      case 'bottom-start':
        return { left: `${10 + 6}px` }
      case 'top':
      case 'bottom':
        return { left: `${halfWidth.value}px` }
      case 'top-end':
      case 'bottom-end':
        return { left: `${popoverRef.value?.offsetWidth - 6 - 10}px` }
      case 'left-start':
      case 'right-start':
        return { top: `${10 + 6}px` }
      case 'left':
      case 'right':
        return { top: `${halfHeight.value}px` }
      case 'left-end':
      case 'right-end':
        return { top: `${popoverRef.value?.offsetHeight - 6 - 10}px` }
    }
  })

  const arrowClass = computed(() => {
    const type = arrowClassMap.find((item) => item[0].includes(props.placement))?.[1]
    return { [`tu-popover-arrow--${type}`]: !!type }
  })

  const eventMap = {
    hover: { onMouseover },
    click: { onClick },
    focus: { onFocus: open, onBlur },
    manual: { },
  }

  const on = eventMap[props.trigger]

  function isTrigger(event: MouseEvent) {
    const trigger = triggerRef.value.$el
    return trigger === event.target || trigger.contains(event.target)
  }
  function isPopover(event: MouseEvent) {
    const el = popoverRef.value
    return el && (el === event.target || el.contains(event.target))
  }

  function open() {
    const { top, left } = getPosition() || {}
    triggerStyle.value.top = top
    triggerStyle.value.left = left
    visible.value = true
  }

  function close() {
    visible.value = false
  }

  function getPosition() {
    const el = triggerRef.value.$el
    const { top, left } = getClientRect(el) as DOMRect
    const { scrollTop, scrollLeft } = document.documentElement
    const docTop = top + scrollTop
    const docLeft = left + scrollLeft

    switch (props.placement) {
      case 'top-start':
      case 'left-start':
        return {
          top: docTop,
          left: docLeft
        }
      case 'top':
        return {
          top: docTop,
          left: docLeft + el.offsetWidth / 2
        }
      case 'top-end':
      case 'right-start':
        return {
          top: docTop,
          left: docLeft + el.offsetWidth
        }
      case 'left':
        return {
          top: docTop + el.offsetHeight / 2,
          left: docLeft
        }
      case 'left-end':
      case 'bottom-start':
        return {
          top: docTop + el.offsetHeight,
          left: docLeft
        }

      case 'right':
        return {
          top: docTop + el.offsetHeight / 2,
          left: docLeft + el.offsetWidth
        }
      case 'right-end':
      case 'bottom-end':
        return {
          top: docTop + el.offsetHeight,
          left: docLeft + el.offsetWidth
        }
      case 'bottom':
        return {
          top: docTop + el.offsetHeight,
          left: docLeft + el.offsetWidth / 2
        }
    }
  }

  function onMouseover() {
    !visible.value && open()
    nextTick(() => document.addEventListener('mouseover', handleDomMouseover))
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

  function onBlur(event: MouseEvent) {
    if (isPopover(event)) return 
    close()
  }

  function handleDomMouseover(e: MouseEvent){
    if (isPopover(e) || isTrigger(e)) {
      closeTimerId.value && window.clearTimeout(closeTimerId.value!)
    } else if(visible.value) {
      closeTimerId.value = setTimeout(() => {
        document.removeEventListener('mouseover', handleDomMouseover)
        close()
      }, 200)
    }
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
    if(mousedown.value) {
      mousedown.value = false
    }
  }

  return () => [
    context.slots.default && h(context.slots.default?.()[0], { ref: triggerRef, ...on }),
    <Teleport to="body">
      <Transition name="popover-fade">
        {{
          default: () => visiblePopover.value ? (
            <div class="tu-popover" ref={popoverRef} style={style.value}>
              <div class="tu-popover__content">{props.content || context.slots.content?.()}</div>
              <div class={['tu-popover-arrow-wrapper', arrowClass.value]} style={arrowStyle.value}>
                <div class="tu-popover-arrow"></div> 
              </div>
            </div>
          ) : null
        }}
      </Transition>
    </Teleport>
  ]
}