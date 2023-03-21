<template>
  <tu-tree :data="data" :default-expanded-keys="['1', '2']" checkable/>
</template>

<script setup lang="ts">
import { ref } from 'vue'

function createData(depth = 3, iterator = 1, prefix = '') {
  const result = []
  let index = -1
  const length = iterator + 1
  while (++index < length) {
    const id = index + 1
    const key = iterator === 1 ? String(id) : `${prefix}-${id}`
    const node = {
      label: `Option ${key}`,
      key,
      ...(
        iterator === depth
          ? {}
          : { children: createData(depth, iterator + 1, key) }
        )
    }
    result.push(node)
  }

  return result
}

const data = ref(createData())
</script>