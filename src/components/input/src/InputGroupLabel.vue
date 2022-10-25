<template>
  <div class="tu-input-group-label">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TInputGroupLabel',
  inheritAttrs: false
})
</script>