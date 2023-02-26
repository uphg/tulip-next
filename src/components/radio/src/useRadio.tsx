import { computed, defineComponent, inject, ref, watch, type PropType, type SetupContext } from 'vue'
import { radioGroupInjectionKey, type RadioGroupRef } from './RadioGroup'
import { isNil } from '../../../utils'
import type { RadioProps } from './radioProps'

export function useRadio(props: RadioProps) {
  const isFocus = ref(false)
  const radioGroup = inject<RadioGroupRef | null>(radioGroupInjectionKey, null)
  const checked = computed(() => {
    if (!isNil(radioGroup?.value.value)) {
      return radioGroup!.value.value === props.value
    }
    return props.checked
  })

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
    handleChange,
    handleFocus,
    handleBlur,
  }
}