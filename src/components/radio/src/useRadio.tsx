import { computed, inject, ref, type Ref, type SetupContext } from 'vue'
import { radioGroupInjectionKey } from './RadioGroup'
import type { RadioGroupRef } from './types'
import type { RadioProps } from './props'
import { isNil } from '../../../utils'

export function useRadio(
  props: RadioProps, 
  context: SetupContext<['update:checked']>, 
  input: Ref<HTMLInputElement | null>
) {
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
    if (radioGroup) {
      radioGroup.updateValue(props.value)
      return
    }

    context.emit('update:checked', !props.checked)
  }

  function handleFocus() {
    isFocus.value = true
  }
  function handleBlur() {
    isFocus.value = false
  }

  function focus() {
    input.value?.focus()
  }

  function blur() {
    input.value?.blur()
  }

  return {
    isFocus,
    radioGroup,
    checked,
    size,
    handleChange,
    handleFocus,
    handleBlur,
    focus,
    blur
  }
}