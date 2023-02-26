import { computed, defineComponent, provide, ref, toRef, type ComponentInternalInstance, type ExtractPropTypes, type Prop, type PropType, type Ref, type SetupContext, type UnwrapRef, type VNode } from 'vue'
import { filterComponent, flattenSlots, getSlot } from '../../../utils'
import type { RadioProps } from './radioProps'

export type RadioGroupRef = {
  value: Ref<RadioGroupProps['value']>
  filling: Ref<RadioGroupProps['filling']>
  buttons: Ref<RadioButtonInstance[]>
  updateValue: (value: RadioGroupProps['value']) => void
  setButton: (index: number, value: RadioButtonInstance) => void
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupInjectionKey = Symbol('tu.radio.group') 
export const radioGroupProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean | null>,
    default: null
  },
  filling: Boolean as PropType<boolean>
}

type RadioButtonInstance = {
  value: Ref<RadioProps['value']>
  disabled: Ref<RadioProps['disabled']>
  isFocus: Ref<boolean>
} | null

const RadioGroup = defineComponent({
  name: 'TuRadioGroup',
  props: radioGroupProps,
  emits: ['update:value'],
  setup(props, context) {
    const buttons = ref<UnwrapRef<RadioButtonInstance>[]>([])
    provide(radioGroupInjectionKey, {
      value: computed(() => props.value),
      buttons,
      filling: toRef(props, 'filling'),
      updateValue(value: RadioGroupProps['value']) {
        context.emit('update:value', value)
      },
      setButton(index: number, value: UnwrapRef<RadioButtonInstance>) {
        buttons.value[index] = value
      }
    })

    return () => {
      const slot = flattenSlots(getSlot(context))
      const { children, isButton } = renderRadioButtons(slot, { value: props.value, filling: props.filling, buttons: buttons.value })
      return (
        <div class="tu-radio-group">{ isButton ? children : slot}</div>
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
    return { children, isButton:false }
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