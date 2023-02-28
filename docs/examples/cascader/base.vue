<template>
  <tu-cascader v-model:value="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption } from '../../../src/components/cascader/src/cascaderProps'

function createOptions(depth = 3, iterator = 1, prefix = '') {
  let i = -1
  const length = 12
  const options: CascaderOption[] = []
  while (++i <= length) {
    const disabled = i / (2 + iterator) === 1
    const id = i + 1
    if (iterator === 1) {
      options[i] = {
        label: `level ${id}`,
        value: `${id}`,
        disabled,
        children: createOptions(depth, iterator + 1, `${id}`)
      }
    } else if (iterator === depth) {
      options[i] = {
        label: `level ${prefix}-${id}`,
        value: `${prefix}-${id}`,
        disabled
      }
    } else {
      options[i] = {
        label: `level ${prefix}-${id}`,
        value: `${prefix}-${id}`,
        disabled,
        children: createOptions(depth, iterator + 1, `${prefix}-${id}`)
      }
    }
  }

  return options
}

const value = ref([])
const options = ref<CascaderOption[]>(createOptions())
</script>

<style>
.demo-cascader .tu-cascader {
  width: 320px;
}
</style>
