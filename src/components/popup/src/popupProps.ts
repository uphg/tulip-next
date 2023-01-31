import type { ExtractPropTypes, PropType } from 'vue'
import type { PlacementTypes, PopoverTrigger } from '../../popover/src/popoverProps'

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupProps = {
  disabled: Boolean as PropType<boolean>,
  visible: Boolean as PropType<boolean>,
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'hover'
  },
  placement: {
    type: String as PropType<PlacementTypes>,
    default: 'top'
  },
  popupMargin: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  }
}