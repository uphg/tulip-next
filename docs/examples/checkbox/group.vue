<template>
  <tu-checkbox-group v-model:value="cities">
    <tu-space item-style="display: flex;">
      <tu-checkbox value="Beijing" label="北京" />
      <tu-checkbox value="Shanghai" label="上海" />
      <tu-checkbox value="Guangzhou" label="广州" />
      <tu-checkbox value="Shenzen" label="深圳" />
    </tu-space>
  </tu-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = ref([])
</script>