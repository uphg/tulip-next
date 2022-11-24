import { defineComponent, h, onMounted, ref, type PropType, type VNodeRef, nextTick, computed, onUnmounted, onBeforeUnmount } from "vue"
import { getClientRect } from "../../../utils/dom"
import PopoverBody from './PopoverBody'

export const popoverProps = {
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>,
    default: 'hover',
    validator(value: string) {
      return ['hover', 'click', 'focus', 'manual'].indexOf(value) > -1
    }
  },
  content: String as PropType<string>,
  position: {
    type: String as PropType<'top' | 'left' | 'bottom' | 'right'>,
    default: 'top',
    validator(value: string) {
      return ['top', 'left', 'bottom', 'right'].indexOf(value) > -1
    }
  }
}

const Popover = defineComponent({
  name: 'TuPopover',
  props: popoverProps,
  setup(props, context) {
    const visible = ref(false)
    const closeTimerId = ref<NodeJS.Timeout | null>(null)
    const position = ref({ left: 0, top: 0 })
    // const clickedDoc = ref(false)
    const triggerRef = ref<VNodeRef | null>(null)
    const popoverRef = ref<VNodeRef | null>(null)
    const loadDomListener = ref(false)
    const eventMap = {
      click: {
        onClick: (event: MouseEvent) => {
          if(visible.value) {
            open()
          } else {
            if (isPopover(event)) return 
            setTimeout(close, 300)
          }
        }
      },
      hover: {
        onMouseover: () => {
          !visible.value && open()
          if(!loadDomListener.value) {
            loadDomListener.value = true
            nextTick(() => {
              document.addEventListener('mouseover', handleDomMouseover)
            })
          }
        }
      },
      focus: {
        onFocus: open,
        onBlur: (event: MouseEvent) => {
          if (isPopover(event)) return 
          setTimeout(close, 300)
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
      const el = popoverRef.value.popoverBody
      return el && (el === event.target || el.contains(event.target))
    }

    function open() {
      const el = triggerRef.value.$el
      const halfWidth = el.offsetWidth / 2
      const { top, left } = getClientRect(el) as DOMRect
      const { scrollTop, scrollLeft } = document.documentElement
      position.value.top = top + scrollTop
      position.value.left = left + scrollLeft + halfWidth
      visible.value = true
    }

    function close() {
      visible.value = false
    }

    function handleDomMouseover(e: MouseEvent){
      if (isPopover(e) || isTrigger(e) && closeTimerId.value) {
        window.clearTimeout(closeTimerId.value!)
      } else {
        visible.value && (closeTimerId.value = setTimeout(close, 150))
      }
    }

    onBeforeUnmount(() => {
      props.trigger === 'hover' && document.removeEventListener('mouseover', handleDomMouseover)
    })

    return () => [
      context.slots.default && h(context.slots.default?.()[0], { ref: triggerRef, ...on }),
      <PopoverBody
        ref={popoverRef}
        position={position.value}
        v-model={[visible.value, 'visible']}
      >{props.content || context.slots.content?.()}</PopoverBody>
    ]
  }
})

export default Popover