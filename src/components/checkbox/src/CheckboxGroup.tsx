import { defineComponent, computed, provide, type Ref, ref } from 'vue'
import { isNil, isNumber } from '../../../utils'
import { type CheckboxProps, checkboxGroupProps, type CheckboxGroupProps } from './checkboxProps'

export type CheckboxGroupRef = {
  value: Ref<CheckboxGroupProps['value']>
  updateValue: (value: CheckboxProps['value']) => void
}
export const checkboxGroupInjectionKey = Symbol()

export const CheckboxGroup = defineComponent({
  name: 'TuCheckboxGroup',
  props: checkboxGroupProps,
  emits: ['update:value'],
  setup(props, context) {
    provide(checkboxGroupInjectionKey, {
      value: computed(() => props.value),
      updateValue(value: CheckboxProps['value']) {
        if (isNil(value)) return
        const index = props.value?.findIndex((item) => item === value)
        if (isNumber(index) && index >= 0) {
          const befor = props.value!.slice(0, index)
          const after = props.value!.slice(index! + 1)
          const result = [...befor, ...after]
          context.emit('update:value', result)
        } else {
          const result = [...(props.value || []), value]
          context.emit('update:value', result)
        }
      }
    })
    return () => (
      <div class="tu-checkbox-group">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default CheckboxGroup
