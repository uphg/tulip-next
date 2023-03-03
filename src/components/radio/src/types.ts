import type { Ref } from 'vue'
import type { RadioProps, RadioGroupProps } from './radioProps'

export type RadioGroupRef = {
  value: Ref<RadioGroupProps['value']>
  filling: Ref<RadioGroupProps['filling']>
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
