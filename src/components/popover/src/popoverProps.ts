import type { PropType, ExtractPropTypes } from "vue"
import { includes } from '../../../utils'

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

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
  content: String as PropType<string>,
  visible: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  placement: {
    type: String as PropType<
      'top-start' | 'top' | 'top-end' |
      'left-start' | 'left' | 'left-end' |
      'right-start' | 'right' | 'right-end' |
      'bottom-start' | 'bottom' | 'bottom-end'
    >,
    default: 'top',
    validator(value: string) {
      const result = includes(placementTypes, value)
      return result
    }
  },
  transitionName: {
    type: String as PropType<'zoom' | 'fade'>,
    default: 'zoom'
  },
  hideArrow: Boolean as PropType<boolean>,
  raw: Boolean as PropType<boolean>
}
