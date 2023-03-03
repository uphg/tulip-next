import type { ExtractPropTypes, PropType } from 'vue'

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export type CascaderBaseValue = string | number | null
export type CascaderValue = CascaderBaseValue[] | CascaderOption[]
export interface CascaderOption {
  [k: string]: CascaderBaseValue | CascaderOption[]
}

export const cascaderProps = {
  value: {
    type: [Array, null] as PropType<CascaderValue>,
    default: null
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => []
  },
  valueField: {
    type: String as PropType<string>,
    default: 'value' as const
  },
  labelField: {
    type: String as PropType<string>,
    default: 'label' as const
  },
  childrenField: {
    type: String as PropType<string>,
    default: 'children' as const
  },
  disabledField: {
    type: String as PropType<string>,
    default: 'disabled' as const
  },
  placeholder: String as PropType<string>,
  clearable: Boolean as PropType<boolean>
}
