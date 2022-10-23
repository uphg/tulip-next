<template>
  <div
    :class="[
      'tu-button-group',
      { 'tu-button--vertical': vertical }
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TButtonGroup'
})
</script>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  vertical: Boolean as PropType<boolean>
})
</script>
<!-- 
<style lang="stylus">
@require '../../_styles/components/button-group'
</style> -->
