import type { PropType, ExtractPropTypes } from "vue"
import { includes } from '../../../utils'

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

type PlacementTypes = 'top-start' | 'top' | 'top-end' |
'left-start' | 'left' | 'left-end' |
'right-start' | 'right' | 'right-end' |
'bottom-start' | 'bottom' | 'bottom-end'

const placementTypes = [
  'top-start', 'top', 'top-end',
  'left-start', 'left', 'left-end',
  'right-start', 'right', 'right-end',
  'bottom-start', 'bottom', 'bottom-end',
]

const triggerTypes = ['hover', 'click', 'focus', 'manual']

export const popoverProps = {
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>,
    default: 'hover',
    validator(value: string) {
      return includes(triggerTypes, value)
    }
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  placement: {
    type: String as PropType<PlacementTypes>,
    default: 'top',
    validator(value: string) {
      return includes(placementTypes, value)
    }
  },
  content: String as PropType<string>,
  hideArrow: Boolean as PropType<boolean>,
  raw: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
}
