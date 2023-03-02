import type { PropType, ExtractPropTypes } from 'vue'

export type CheckboxValue = string | number
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const checkboxProps = {
  checked: Boolean as PropType<boolean>,
  value: [String, Number] as PropType<CheckboxValue>,
  label: [String, Number] as PropType<string | number>,
  indeterminate: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>
}

export const checkboxGroupProps = {
  value: Array as PropType<CheckboxValue[]>
}