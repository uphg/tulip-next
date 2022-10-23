<template>
  <svg :class="{ [`tu-icon-${name}`]: name }" aria-hidden="true">
    <use :xlink:href="`#tu-icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { useIcons } from '../../../icons/useIcons'

defineProps({
  name: String
});

useIcons(window)
</script>
<!-- 
<style lang="stylus">
@require '../../_styles/components/icon'
</style> -->
