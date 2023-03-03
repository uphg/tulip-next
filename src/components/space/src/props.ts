import type { PropType } from 'vue'
import { includes,  alignTypes, justifyTypes, type AlignTypes, type JustifyTypes } from '../../../utils'

export const spaceProps = {
  inline: Boolean as PropType<boolean>,
  vertical: Boolean as PropType<boolean>,
  nowrap: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  justify: {
    type: String as PropType<JustifyTypes>,
    default: 'start',
    validator(value: string) {
      return includes(justifyTypes, value)
    }
  },
  align: {
    type: String as PropType<AlignTypes>,
    default: 'start',
    validator(value: string) {
      return includes(alignTypes, value)
    }
  },
  size: {
    type: [String, Number, Array] as PropType<'small' | 'medium' | 'large' | number | [number, number]>,
    default: () => [8, 12]
  },
  wrapItem: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  itemStyle: [String, Object] as PropType<string | Record<string, string>>,
  itemClass: [String, Object] as PropType<string | Record<string, string>>
}
