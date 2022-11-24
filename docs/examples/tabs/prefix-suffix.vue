<template>
  <tu-tabs v-model:value="value">
    <tu-tab-pane :name="1" label="标题1">我是 1 号</tu-tab-pane>
    <tu-tab-pane :name="2" label="标题2222">我是 2 号</tu-tab-pane>
    <tu-tab-pane :name="3" label="标题333333">我是 3 号</tu-tab-pane>
    <template #prefix>🍊</template>
    <template #suffix>🍇</template>
  </tu-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(2)
</script>
