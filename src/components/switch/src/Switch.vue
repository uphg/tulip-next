<template>
  <button
    :class="[
      'tu-switch',
      {
        'tu-switch--checked': switchValueState,
        [`tu-switch--${size}`]: size,
        'is-square': square
      }
    ]"
    @click="toggle"
  >
    <BaseWave ref="waveRef" big />
    <span class="tu-switch__wrap">
      <span v-if="$slots.checked || $slots.unchecked" class="tu-switch__content">
        <span class="tu-switch__checked">
          <slot name="checked" />
        </span>
        <span class="tu-switch__unchecked">
          <slot name="unchecked" />
        </span>
      </span>
      <span class="tu-switch__core">
        <span v-if="$slots.unchecked" class="tu-switch__core-unchecked">
          <slot name="unchecked" />
        </span>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { isNil } from '../../../utils'
import BaseWave from '../../base-wave/src/BaseWave.vue'
import type { PropType } from 'vue'
import type { BaseWaveRef } from '../../base-wave'

type SwitchValue = string | number | boolean

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
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
})

const emit = defineEmits(['update:value'])

const waveRef = ref<BaseWaveRef | null>(null)
const hasCustomValue = computed(() => !isNil(props.checkedValue) && !isNil(props.uncheckedValue))
const switchValueState = computed(() => hasCustomValue.value ? props.value === props.checkedValue : props.value)

const setValue = (value: SwitchValue) => {
  emit('update:value', value)
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
</script>
<!-- 
<style lang="stylus">
@require '../../_styles/components/switch'
</style> -->
