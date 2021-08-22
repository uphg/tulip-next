<template>
  <input
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
