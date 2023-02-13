<template>
  <div style="padding: 30px">
    <tu-select v-model:value="value" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

const options = ref([
  { label: '选项1', value: 0 },
  { label: '选项2', value: 1 },
  { label: '选项3', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项3', value: 4 },
  { label: '选项3', value: 5 },
  { label: '选项3', value: 6 },
  { label: '选项3', value: 7 },
  { label: '选项3', value: 8 },
  { label: '选项3', value: 9 },
  { label: '选项3', value: 10 },
  { label: '选项3', value: 11 },
  { label: '选项3', value: 12 },
  { label: '选项3', value: 13 },
  { label: '选项3', value: 14 },
  { label: '选项3', value: 15 },
  { label: '选项3', value: 16 },
  { label: '选项3', value: 17 }
])
</script>
