import type { ExtractPropTypes, PropType } from 'vue'
import type { PlacementTypes } from '../../popover/src/popoverProps'
import type { PopupTrigger } from '../../../types'

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
  updatePopup: Function as PropType<(value: UpdatePopupStyle) => void>,
  width: [Number, String] as PropType<number | string | 'trigger'>
}