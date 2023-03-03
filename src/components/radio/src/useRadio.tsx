import { computed, inject, ref } from 'vue'
import { radioGroupInjectionKey } from './RadioGroup'
import type { RadioGroupRef } from './types'
import type { RadioProps } from './props'
import { isNil } from '../../../utils'

export function useRadio(props: RadioProps) {
  const isFocus = ref(false)
  const radioGroup = inject<RadioGroupRef | null>(radioGroupInjectionKey, null)
  const checked = computed(() => {
    if (!isNil(radioGroup?.value.value)) {
      return radioGroup!.value.value === props.value
    }
    return props.checked
  })

  const size = computed(() => props.size ? props.size : radioGroup?.size.value)

  function handleChange() {
    radioGroup?.updateValue(props.value)
  }

  function handleFocus() {
    isFocus.value = true
  }
  function handleBlur() {
    isFocus.value = false
  }

  return {
    isFocus,
    radioGroup,
    checked,
    size,
    handleChange,
    handleFocus,
    handleBlur,
  }
}