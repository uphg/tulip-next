import type { PropType, ExtractPropTypes } from 'vue'
import type { PopupTrigger } from '../../../types'
import { includes } from '../../../utils'

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export type PlacementTypes = 'top-start' | 'top' | 'top-end' |
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
    type: String as PropType<PopupTrigger>,
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
  // Popover 与触发元素的间隙
  popoverMargin: {
    type: [String, Number] as PropType<string | number>,
    default: 8
  },
  // 箭头元素一侧对齐时距离侧边的间隙
  arrowSideMargin: {
    type: [String, Number] as PropType<string | number>,
    default: 10
  },
  hideArrow: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>
}
