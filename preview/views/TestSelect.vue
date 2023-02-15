<template>
  <div style="padding: 30px">
    <br v-for="item in 10" :key="item"/>
    <div><tu-select v-model:value="value" :options="options"/></div>
    <br />
    <div><tu-select v-model:value="value2" :options="options"/></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
const value2 = ref(null)

const options = ref([
  { label: '选项1', value: 0 },
  { label: '选项2', value: 1, disabled: true },
  { label: '选项3', value: 2 },
  { label: '选项4', value: 3 },
  { label: '选项5', value: 4 },
  { label: '选项6', value: 5 },
  { label: '选项7', value: 6 },
  { label: '选项8', value: 7 },
  { label: '选项9', value: 8 },
  { label: '选项10', value: 9 },
  { label: '选项11', value: 10 },
  { label: '选项12', value: 11 },
  { label: '选项13', value: 12 },
  { label: '选项14', value: 13 },
  { label: '选项15', value: 14 },
  { label: '选项16', value: 15 },
  { label: '选项17', value: 16 },
  { label: '选项18', value: 17 }
])
</script>
