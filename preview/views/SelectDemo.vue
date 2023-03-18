<template>
  <div style="padding-top: 300px; width: 300px;">
    <tu-space vertical>
      <tu-select v-model:value="value" :options="options" clearable/>
      <tu-select v-model:value="value2" :options="options"/>
      <tu-select v-model:value="value2" :options="options" disabled/>

      <tu-select v-model:value="value3" :options="options" multiple clearable/>
      <h2>尺寸</h2>
      <tu-select v-model:value="value3" :options="options" size="small" multiple clearable/>
      <tu-select v-model:value="value3" :options="options" multiple clearable/>
      <tu-select v-model:value="value3" :options="options" size="large" multiple clearable/>
    </tu-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(9)
const value2 = ref(null)
const value3 = ref(void 0)

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
