import { defineComponent, computed, provide, type Ref, ref } from 'vue'
import { useNameScope } from '../../../composables/useNameScope'
import { isNil, isNumber } from '../../../utils'
import { type CheckboxProps, checkboxGroupProps, type CheckboxGroupProps } from './props'

export type CheckboxGroupRef = {
  value: Ref<CheckboxGroupProps['value']>
  size: Ref<CheckboxGroupProps['size']>
  updateValue: (value: CheckboxProps['value']) => void
}
export const checkboxGroupInjectionKey = Symbol()

export const CheckboxGroup = defineComponent({
  name: 'TuCheckboxGroup',
  props: checkboxGroupProps,
  emits: ['update:value'],
  setup(props, context) {
    const ns = useNameScope('checkbox-group')

    provide(checkboxGroupInjectionKey, {
      value: computed(() => props.value),
      size: computed(() => props.size),
      updateValue(value: CheckboxProps['value']) {
        if (isNil(value)) return
        const index = props.value?.findIndex((item) => item === value)
        let result = []
        if (isNumber(index) && index >= 0) {
          const befor = props.value!.slice(0, index)
          const after = props.value!.slice(index! + 1)
          result = [...befor, ...after]
        } else {
          result = [...(props.value || []), value]
        }
        context.emit('update:value', result)
      }
    })

    return () => (
      <div class={[ns.base, { [ns.is(props.size)]: props.size }]}>
        {context.slots.default?.()}
      </div>
    )
  }
})

export default CheckboxGroup
