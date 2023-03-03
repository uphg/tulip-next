<template>
  <tu-radio-group v-model:value="checkedValue" name="radiogroup">
    <tu-space align="end">
      <tu-radio :value="1" :checked="checkedValue === 1" size="small">hi</tu-radio>
      <tu-radio :value="2" :checked="checkedValue === 2" size="medium">hi</tu-radio>
      <tu-radio :value="3" :checked="checkedValue === 3" size="large">hi</tu-radio>
    </tu-space>
  </tu-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref(1)
</script>
