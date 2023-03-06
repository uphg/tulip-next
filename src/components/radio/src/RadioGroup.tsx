import { computed, defineComponent, provide, ref, toRef } from 'vue'
import type { UnwrapRef, VNode } from 'vue'
import { filterComponent, flattenSlots, getSlot } from '../../../utils'
import { radioGroupProps, type RadioGroupProps } from './props'
import type { RadioButtonInstance } from './types'

export const radioGroupInjectionKey = Symbol('tu.radio.group')

const RadioGroup = defineComponent({
  name: 'TuRadioGroup',
  props: radioGroupProps,
  emits: ['update:value'],
  setup(props, context) {
    const buttons = ref<UnwrapRef<RadioButtonInstance>[]>([])
    const size = computed(() => props.size)

    provide(radioGroupInjectionKey, {
      value: computed(() => props.value),
      buttons,
      buttonStyle: computed(() => props.buttonStyle),
      size,
      updateValue(value: RadioGroupProps['value']) {
        context.emit('update:value', value)
      },
      setButton(index: number, value: UnwrapRef<RadioButtonInstance>) {
        buttons.value[index] = value
      }
    })

    return () => {
      const slot = flattenSlots(getSlot<['update:value']>(context))
      const { children, isButton } = renderRadioButtons(slot, { value: props.value, filling: props.buttonStyle === 'solid', buttons: buttons.value })
      return (
        <div
          class={['tu-radio-group', {
            [`tu-radio-group--${size.value}`]: size.value
          }]}
        >{isButton ? children : slot}</div>
      )
    }
  }
})

function renderRadioButtons(defaultSlot: VNode[], { value, filling, buttons }: {
  value: RadioGroupProps['value'],
  filling: boolean | undefined,
  buttons: UnwrapRef<RadioButtonInstance>[]
}) {
  const children: VNode[] = []
  const slot = filterComponent(defaultSlot, 'RadioButton')
  if (slot.length < 1) {
    return { children, isButton: false }
  }
  let index = -1
  while (++index < slot.length) {
    const item = slot[index]
    if (index === 0) {
      children.push(item)
    } else {
      const button = buttons[index]
      const prev = index > 0 ? buttons[index - 1] : null
      children.push(
        <div class={['tu-radio-group__divider', {
          'tu-radio-group__divider--focus': button?.isFocus,
          'tu-radio-group__divider--checked': button?.value === value,
          'tu-radio-group__divider--filling': filling,
          'tu-radio-group__divider--disabled': filling ? button?.disabled : prev?.disabled && button?.disabled
        }]}></div>,
        item
      )
    }
  }
  return { children, isButton: true }
}

export default RadioGroup