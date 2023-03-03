<template>
  <tu-checkbox-group v-model:value="checkedValue">
    <tu-space item-style="display: flex;" align="end">
      <tu-checkbox value="1" size="small" label="小" />
      <tu-checkbox value="2" size="medium" label="中" />
      <tu-checkbox value="3" size="large" label="大" />
    </tu-space>
  </tu-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref([])
</script>
