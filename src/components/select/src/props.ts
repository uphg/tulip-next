import type { PropType, ExtractPropTypes } from 'vue'
import type { SelectOption } from './types'
import type { SelectValue } from '../../../types'

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectProps = {
  value: [String, Number, Array] as PropType<SelectValue | SelectValue[]>,
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  size: {
    type: String as PropType<'' | 'large' | 'medium' | 'small'>,
    validator: (value: string) => {
      return ['', 'large', 'medium', 'small'].includes(value)
    }
  },
  clearable: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  multiple: Boolean as PropType<boolean>
}