<template>
  <div
    :class="[
      'tu-input',
      {
        'tu-input--disabled': disabled,
        'tu-input--focus': isFocus,
      }
    ]"
    @mousedown="handleMouseDown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="type !== 'textarea'">
      <span class="tu-input__wrapper">
        <span v-if="$slots.prefix" class="tu-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          ref="inputRef"
          class="tu-input__base"
          type="text"
          :value="value"
          :disabled="disabled"
          :placeholder="placeholder"
          @blur="handleBlur"
          @focus="handleFocus"
          @input="handleInput"
        >
        <span v-if="$slots.suffix" class="tu-input__suffix">
          <span class="tu-input__" />
          <slot name="suffix" />
        </span>
      </span>
    </template>
    <template v-else>
      <textarea
        class="tu-textarea"
        :disabled="disabled"
      />
    </template>
    <span class="tu-input__border" />
    <span class="tu-input__state-border" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TInput',
  inheritAttrs: false
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue';

const props = defineProps({
  value: {
    type: String as PropType<string | null>,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: Boolean,
  placeholder: String
})

const emit = defineEmits(['update:value'])

const inputRef = ref<HTMLElement | null>(null)
const isFocus = ref(false)
const isHover = ref(false)

const handleInput = (event: Event) => {
  const newValue = (event.target as HTMLTextAreaElement).value;
  if (newValue === props.value) return;
  emit('update:value', newValue);
}

const handleBlur = (event: Event) => {
  isFocus.value = false
}

const handleMouseDown = (event: Event) => {
  const { tagName } = event.target as HTMLElement
  
  if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
    event.preventDefault()
    if (!isFocus.value) {
      inputRef.value?.focus()
    }
  } 
}

const handleMouseEnter = () => {
  isHover.value = true
}

const handleMouseLeave = () => {
  isHover.value = false
}

const handleFocus = (event: Event) => {
  isFocus.value = true
}
</script>
