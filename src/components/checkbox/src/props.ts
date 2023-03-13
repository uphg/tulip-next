import type { PropType, ExtractPropTypes } from 'vue'

export type CheckboxValue = string | number | boolean
export type ChekcboxMeta = { value: CheckboxProps['value'], checked: CheckboxProps['checked'] }
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

const size = String as PropType<'small' | 'medium' | 'large'>

export const checkboxProps = {
  checked: Boolean as PropType<boolean>,
  value: [String, Number, Boolean] as PropType<CheckboxValue>,
  label: [String, Number] as PropType<string | number>,
  indeterminate: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  size,
  onClick: Function as PropType<(e: MouseEvent, meta: ChekcboxMeta) => void>,
  onChange: Function as PropType<(e: InputEvent, meta: ChekcboxMeta) => void>
}

export const checkboxGroupProps = {
  value: Array as PropType<CheckboxValue[]>,
  size
}
