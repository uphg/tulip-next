import type { ExtractPropTypes, PropType } from 'vue'
import type { PlacementTypes } from '../../popover/src/popoverProps'
import type { Fn, PopupTrigger } from '../../../types'

export type PopupProps = ExtractPropTypes<typeof popupProps>

export type UpdatePopupStyle = {
  zIndex?: number,
  width?: string,
  top?: string
  left?: string
}

export const popupProps = {
  disabled: Boolean as PropType<boolean>,
  visible: Boolean as PropType<boolean>,
  placement: {
    type: String as PropType<PlacementTypes>,
    default: 'top'
  },
  popupMargin: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  width: [Number, String] as PropType<number | string>,
  onUpdateStyle: Function as PropType<(value: UpdatePopupStyle) => void>,
  onBeforeEnter: Function as PropType<(el: Element) => void>,
  onEnter: Function as PropType<(el: Element, done: Fn) => void>,
  onAfterEnter: Function as PropType<(el: Element) => void>,
  onEnterCancelled: Function as PropType<(el: Element) => void>,
  onBeforeLeave: Function as PropType<(el: Element) => void>,
  onLeave: Function as PropType<(el: Element, done: Fn) => void>,
  onAfterLeave: Function as PropType<(el: Element) => void>,
  onLeaveCancelled: Function as PropType<(el: Element) => void>
}