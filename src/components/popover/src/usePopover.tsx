import { ref, h, computed, type SetupContext, unref, type Ref } from 'vue'
import type { PlacementTypes, PopoverProps } from './popoverProps'
import { toNumber, withAttrs } from '../../../utils'
import TuPopup from '../../popup/src/Popup'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { ElementStyle } from '../../../types'

type UsePopoverOptions = {
  className?: string | string[]
}

type Popup = typeof TuPopup & {
  popup: HTMLElement,
  trigger: HTMLElement,
  rawPlacement: Ref<PlacementTypes>
}

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
  const arrowStyle = ref<ElementStyle>({})
  const popover = computed(() => popup.value?.popup)
  const trigger = computed(() => popup.value?.trigger)
  const rawPlacement = computed(() => unref(popup.value?.rawPlacement))
  const popoverVisible = computed(() => props.trigger === 'manual' ? props.visible : visible.value)

  const { events, visible, close } = usePopupTriggerMode(trigger, { popup: popover, triggerMode: props.trigger })

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
    const type = rawPlacement.value && arrowClassMap.find((item) => item[0].includes(rawPlacement.value!))?.[1]
    return { [`tu-popover-arrow--${type}`]: !!type }
  }

  function onUpdateStyle() {
    if (props.hideArrow) return
    arrowClass.value = getArrowClass()
    arrowStyle.value = getArrowPosition()
  }

  return () => (
    <TuPopup
      ref={popup}
      class={className}
      disabled={props.disabled}
      visible={popoverVisible.value}
      placement={props.placement}
      popupMargin={props.popoverMargin}
      onUpdateStyle={onUpdateStyle}
    >{{
      trigger: context.slots.trigger && (() => h(context.slots.trigger!()[0], { ...events })),
      default: () => [
        <div class="tu-popover__content">{props.content || context.slots.default?.({ close })}</div>,
        props.hideArrow ? null : (
          <div class={['tu-popover-arrow-wrapper', arrowClass.value]} style={arrowStyle.value}>
            <div class="tu-popover-arrow"></div> 
          </div>
        )
      ],
    }}</TuPopup>
  )
}
