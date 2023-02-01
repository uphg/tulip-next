import { ref, computed, type SetupContext, unref, type Ref } from 'vue'
import type { PlacementTypes, PopoverProps } from './popoverProps'
import { toNumber, withAttrs } from '../../../utils'
import TuPopup from '../../popup/src/Popup'

type UsePopoverOptions = {
  className?: string | string[]
}

type Popup = typeof TuPopup & { popup: HTMLElement, rawPlacement: Ref<PlacementTypes> }

// space
const arrowHeight = 6
const arrowClassMap = [
  [['top-start', 'top', 'top-end'], 'top'],
  [['left-start', 'left', 'left-end'], 'left'],
  [['right-start', 'right', 'right-end'], 'right'],
  [['bottom-start', 'bottom', 'bottom-end'], 'bottom'],
]

export function usePopover(
  props: PopoverProps,
  context: SetupContext<'update:visible'[]>,
  options?: UsePopoverOptions
) {
  const className = ['tu-popover tu-popover--default', options?.className]
  const popup = ref<Popup | null>(null)
  const arrowClass = ref({})
  const arrowStyle = ref({})
  const popover = computed(() => (popup.value as Popup).popup)
  const rawPlacement = computed(() => unref((popup.value as Popup)?.rawPlacement))

  function getArrowPosition() {
    const { offsetWidth: popoverWidth, offsetHeight: popoverHeight } = withAttrs(popover.value)
    const arrowMargin = toNumber(props.arrowMargin)
    switch(rawPlacement.value) {
      case 'top-start':
        return { right: `${popoverWidth - arrowMargin}px` }
      case 'top':
        return { left: `${popoverWidth / 2 - arrowHeight}px` }
      case 'top-end':
        return { left: `${popoverWidth - 12 - arrowMargin}px` }
      case 'bottom-start':
        return { top: `-${arrowHeight}px`, right: `${popoverWidth - arrowMargin}px` }
      case 'bottom':
        return { top: `-${arrowHeight}px`, left: `${popoverWidth / 2 - arrowHeight}px` }
      case 'bottom-end':
        return { top: `-${arrowHeight}px`, left: `${popoverWidth - 12 - arrowMargin}px` }
      case 'left-start':
        return { bottom: `${popoverHeight - arrowMargin}px` }
      case 'left':
        return { top: `${popoverHeight / 2 - arrowHeight}px` }
      case 'left-end':
        return { top: `${popoverHeight - 12 - arrowMargin}px` }
      case 'right-start':
        return { left: `-${arrowHeight}px`, bottom: `${popoverHeight - arrowMargin}px` }
      case 'right':
        return { left: `-${arrowHeight}px`, top: `${popoverHeight / 2 - arrowHeight}px` }
      case 'right-end':
        return { left: `-${arrowHeight}px`, top: `${popoverHeight - 12 - arrowMargin}px` }
    }
  }

  function getArrowClass() {
    const type = arrowClassMap.find((item) => item[0].includes(rawPlacement.value))?.[1]
    return { [`tu-popover-arrow--${type}`]: !!type }
  }

  function updatePopover() {
    if (props.hideArrow) return
    arrowClass.value = getArrowClass()
    arrowStyle.value = getArrowPosition()
  }

  return () => (
    <TuPopup
      ref={popup}
      class={className}
      disabled={props.disabled}
      visible={props.visible}
      trigger={props.trigger}
      placement={props.placement}
      popupMargin={props.popoverMargin}
      updatePopup={updatePopover}
    >{{
      trigger: context.slots.trigger,
      default: (params: { close: () => void }) => [
        <div class="tu-popover__content">{props.content || context.slots.default?.(params)}</div>,
        props.hideArrow ? null : (
          <div class={['tu-popover-arrow-wrapper', arrowClass.value]} style={arrowStyle.value}>
            <div class="tu-popover-arrow"></div> 
          </div>
        )
      ],
    }}</TuPopup>
  )
}
