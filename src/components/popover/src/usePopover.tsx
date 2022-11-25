import {  h, ref, type VNodeRef, nextTick, computed, Teleport, Transition, type SetupContext } from "vue"
import { getClientRect } from "../../../utils"
import type { PopoverProps } from './popoverProps'

export function usePopover(props: PopoverProps, context: SetupContext<{}>) {
  const visible = ref(false)
  const triggerStyle = ref<{ left: number | undefined, top: number | undefined }>({ left: 0, top: 0 })
  const closeTimerId = ref<NodeJS.Timeout | null>(null)
  const mousedown = ref(false)
  const triggerRef = ref<VNodeRef | null>(null)
  const popoverRef = ref<VNodeRef | null>(null)
  const halfWidth = computed(() => (popoverRef.value?.offsetWidth || 0) / 2)

  const arrowStyle = computed(() => {
    if (props.placement === 'top') {
      return { left: `${halfWidth.value}px` }
    }

    if (props.placement === 'top-start') {
      return { left: `${20}px` }
    }

    if (props.placement === 'top-end') {
      return { left: `${popoverRef.value?.offsetWidth - 6 - 20}px` }
    }
    return { }
  })

  const style = computed(() => {
    const { top, left } = triggerStyle.value
    if (props.placement === 'top') {
      return {
        top: top && `${top - (popoverRef.value?.offsetHeight || 0) - 8}px`,
        left: left && `${left - halfWidth.value}px`
      }
    }
    if (props.placement === 'top-start') {
      return {
        top: top && `${top - (popoverRef.value?.offsetHeight || 0) - 8}px`,
        left: left && `${left}px`
      }
    }

    if (props.placement === 'top-end') {
      const trigger = triggerRef.value.$el
      const temp =  popoverRef.value?.offsetWidth - trigger.offsetWidth
      return {
        top: top && `${top - (popoverRef.value?.offsetHeight || 0) - 8}px`,
        left: left && `${left - temp}px`
      }
    }
    return {
      top: 0,
      left: 0
    }
  })
  const visiblePopover = computed(() => props.visible !== void 0 ? props.visible : visible.value )

  const eventMap = {
    hover: {
      onMouseover: () => {
        !visible.value && open()
        nextTick(() => document.addEventListener('mouseover', handleDomMouseover))
      }
    },
    click: {
      onClick() {
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
    },
    focus: {
      onFocus: open,
      onBlur: (event: MouseEvent) => {
        if (isPopover(event)) return 
        close()
      }
    },
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

    if (props.placement === 'top') {
      const { top, left } = getClientRect(el) as DOMRect
      const { scrollTop, scrollLeft } = document.documentElement
      return {
        top: top + scrollTop,
        left: left + scrollLeft + el.offsetWidth / 2
      }
    }

    if (props.placement === 'top-start') {
      const { top, left } = getClientRect(el) as DOMRect
      const { scrollTop, scrollLeft } = document.documentElement
      return {
        top: top + scrollTop,
        left: left + scrollLeft
      }
    }

    if (props.placement === 'top-end') {
      const { top, left } = getClientRect(el) as DOMRect
      const { scrollTop, scrollLeft } = document.documentElement
      return {
        top: top + scrollTop,
        left: left + scrollLeft
      }
    }


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
              <div class="tu-popover-arrow-wrapper" style={arrowStyle.value}>
                <div class="tu-popover-arrow"></div> 
              </div>
            </div>
          ) : null
        }}
      </Transition>
    </Teleport>
  ]
}