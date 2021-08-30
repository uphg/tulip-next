<template>
  <input
    class="tulp-input"
    type="text"
    @input="handleInput"
  >
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
type TuInputValue = PropType<string | null>

export default defineComponent({
  props: {
    value: String as TuInputValue
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
@import 'style/input';
</style>
