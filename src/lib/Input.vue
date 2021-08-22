<template>
  <input
    class="tulp-input"
    type="text"
    @input="handleInput"
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: String
  },
  setup(props, context) {
    const handleInput = (event: Event) => {
      const newValue = (event.target as HTMLTextAreaElement).value
      if (newValue === props.value) return
      context.emit('update:value', newValue)
    }
    return { handleInput }
  },
})
</script>
<style lang="scss">
@import 'style/common/variable.scss';

.tulp-input {
  font-size: $_font-size;
  font-family: inherit;
  border: 1px solid $_border-color;
  box-sizing: border-box;
  border-radius: $_border-radius;
  padding: $_input-padding;
  line-height: $_input-line-height;
  transition: $_color-transition, $_border-color-transition, $_box-shadow-transition;
  &:hover {
    border-color: $_border-color-dark;
  }
  &:focus {
    border-color: $_color-primary;
    box-shadow: 0 0 0 2.2px $_input-wave;
  }
  &:focus, &:focus-visible {
    outline: none;
  }
}
</style>
