<template>
  <tu-space vertical>
    <tu-select v-model:value="value" :options="options" size="small"/>
    <tu-select v-model:value="value" :options="options"/>
    <tu-select v-model:value="value" :options="options" size="large"/>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '../../../src/components/select/src/Select'

const value = ref(null)
const options = ref<SelectOption[]>([])

function createOptions() {
  let index = -1
  while (++index < 12) {
    const item = {
      value: `${index + 1}`,
      label: `Option ${index + 1}`
    }
    options.value.push(item)
  }

  options.value[2].disabled = true
}

createOptions()
</script>

<style>
.demo-select .tu-select {
  width: 240px;
}
</style>
