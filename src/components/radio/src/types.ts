import type { Ref } from 'vue'
import type { RadioProps, RadioGroupProps } from './props'

export type RadioGroupRef = {
  value: Ref<RadioGroupProps['value']>
  buttonStyle: Ref<RadioGroupProps['buttonStyle']>
  buttons: Ref<RadioButtonInstance[]>
  size: Ref<RadioGroupProps['size']>
  updateValue: (value: RadioGroupProps['value']) => void
  setButton: (index: number, value: RadioButtonInstance) => void
}

export type RadioButtonInstance = {
  value: Ref<RadioProps['value']>
  disabled: Ref<RadioProps['disabled']>
  isFocus: Ref<boolean>
} | null
