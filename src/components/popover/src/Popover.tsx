import { computed, defineComponent, onMounted, ref, shallowRef, type Ref } from 'vue'
import { popoverProps, type PlacementTypes } from './popoverProps'
import { usePopover } from './usePopover'
import TuPopup from '../../popup/src/Popup'
import { toNumber } from '../../../utils'

type Popup = typeof TuPopup & { rawPlacement: Ref<PlacementTypes> }

const arrowHeight = 6

const arrowClassMap = [
  [['top-start', 'top', 'top-end'], 'top'],
  [['left-start', 'left', 'left-end'], 'left'],
  [['right-start', 'right', 'right-end'], 'right'],
  [['bottom-start', 'bottom', 'bottom-end'], 'bottom'],
]

const Popover = defineComponent({
  name: 'TuPopover',
  props: popoverProps,
  emits: ['update:visible'],
  inheritAttrs: false,
  setup(props, context) {
    const popup = shallowRef<HTMLElement | null | Popup>(null)
    const arrowClass = ref({})
    const arrowStyle = ref({})
    const rawPlacement = computed(() => (popup.value as Popup)?.rawPlacement.value)

    function getArrowPosition() {
      const { offsetWidth, offsetHeight } = popoverRef.value || { offsetHeight: 0, offsetWidth: 0 }
      const arrowMargin = toNumber(props.arrowMargin)
      switch(rawPlacement.value) {
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
      const type = arrowClassMap.find((item) => item[0].includes(rawPlacement.value))?.[1]
      return { [`tu-popover-arrow--${type}`]: !!type }
    }

    onMounted(() => {
      console.log('popup')
      console.log(popup.value.$el)
    })
    return () => (
      <TuPopup
        ref={popup}
        class={['tu-popover tu-popover--default']}
        disabled={props.disabled}
        visible={props.visible}
        trigger={props.trigger}
        placement={props.placement}
        popupMargin={props.popoverMargin}
      >{{
        trigger: context.slots.trigger,
        default: () => [
          <div class="tu-popover__content">{props.content || context.slots?.content?.({ close })}</div>,
          props.hideArrow ? null : (
            <div class={['tu-popover-arrow-wrapper', arrowClass.value]} style={arrowStyle.value}>
              <div class="tu-popover-arrow"></div> 
            </div>
          )
        ],
      }}</TuPopup>
    )
  }
})

export default Popover