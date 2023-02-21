import type { SelectValue } from '../../../types'
import type { PropType } from 'vue'

export type CascaderValue = string | number | symbol | Array<number | string | symbol> | null

export interface CascaderOption {
  label: string | number | null,
  value: string | number | symbol | null,
  disabled?: boolean,
  children?: CascaderOption[]
}

export const cascaderProps = {
  value: {
    type: [Array, null] as PropType<SelectValue[]>,
    default: null
  },
  options: Array as PropType<CascaderOption[]>,
  placeholder: String as PropType<string>
}