import { includes } from "../../../utils";
import { h, type PropType } from "vue";

type JustifyTypes = 'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
type AlignTypes = 'start' | 'end' | 'center' | 'stretch'

const justifyTypes = ['center', 'start', 'end', 'space-between', 'space-around', 'space-evenly']
const alignTypes = ['start', 'end', 'center', 'stretch', 'baseline']

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
  itemStyle: Object as PropType<Record<string, unknown>>,
  itemClass: Object as PropType<Record<string, unknown>>
}

h('div', {  })