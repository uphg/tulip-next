import { defineComponent } from "vue";
import { ref, computed } from 'vue'
import { isNil } from '../../../utils'
import { TuBaseWave } from '../../base-wave'
import type { PropType } from 'vue'
import type { BaseWaveRef } from '../../base-wave'

type SwitchValue = string | number | boolean

const switchProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false
  },
  size: {
    type: String as PropType<'' | 'large' | 'medium' | 'small'>,
    validator: (value: string) => {
      return ['', 'large', 'medium', 'small'].includes(value)
    }
  },
  checkedValue: {
    type: [String, Number, Boolean],
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: false
  },
  square: Boolean
}

const Switch = defineComponent({
  name: 'TuSwitch',
  props: switchProps,
  emits: ['update:value'],
  setup(props, context) {
    const waveRef = ref<BaseWaveRef | null>(null)
    const hasCustomValue = computed(() => !isNil(props.checkedValue) && !isNil(props.uncheckedValue))
    const switchValueState = computed(() => hasCustomValue.value ? props.value === props.checkedValue : props.value)

    const setValue = (value: SwitchValue) => {
      context.emit('update:value', value)
    }

    const toggle = () => {
      waveRef.value?.triggerWave()
      if (hasCustomValue.value) {
        setValue((props.value === props.uncheckedValue ? props.checkedValue : props.uncheckedValue) as SwitchValue)
        return
      }
      setValue(!props.value)
    }

    if (hasCustomValue.value) {
      if (props.value === props.uncheckedValue) {
        setValue(props.uncheckedValue)
      }
      if (props.value === props.checkedValue) {
        setValue(props.checkedValue)
      }
    }
    return () => {
      const { size, square } = props
      const { slots } = context
      return (
        <button
          class={[
            'tu-switch',
            {
              'tu-switch--checked': switchValueState.value,
              [`tu-switch--${size}`]: size,
              'is-square': square
            }
          ]}
          onClick={toggle}
        >
          <TuBaseWave ref={waveRef} size="large"/>
          <span class="tu-switch__wrap">
            {slots.checked || slots.unchecked ? (
              <span class="tu-switch__content">
                <span class="tu-switch__checked">
                  {slots.checked?.()}
                </span>
                <span class="tu-switch__unchecked">
                  {slots.unchecked?.()}
                </span>
              </span>
            ) : null}
            <span class="tu-switch__core">
              {slots.unchecked ? (
                <span class="tu-switch__core-unchecked">
                  {slots.unchecked?.()}
                </span>
              ) : null}
            </span>
          </span>
        </button>
      )
    }
  }
})

export default Switch
