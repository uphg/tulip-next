<template>
  <div class="tu-input-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TuInputGroup',
  inheritAttrs: false
})
</script>