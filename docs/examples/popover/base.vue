<template>
  <tu-space>
    <tu-popover content="死亡不是失去了生命，而是走出了时间">
      <template #trigger><tu-button>悬浮</tu-button></template>
    </tu-popover>
    <tu-popover content="死亡不是失去了生命，而是走出了时间" trigger="click">
      <template #trigger><tu-button>点击</tu-button></template>
    </tu-popover>
    <tu-popover content="死亡不是失去了生命，而是走出了时间" trigger="focus">
      <template #trigger><tu-button>聚焦</tu-button></template>
    </tu-popover>
    <tu-popover :visible="visible" content="死亡不是失去了生命，而是走出了时间" trigger="manual">
      <template #trigger><tu-button @click="visible = !visible">手动</tu-button></template>
    </tu-popover>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>