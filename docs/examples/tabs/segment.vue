<template>
  <h2>白雪公主</h2>
  <tu-tabs v-model:value="value" type="segment">
    <tu-tab-pane :name="1" label="第一章">我是第一章</tu-tab-pane>
    <tu-tab-pane :name="2" label="第二章">我是第二章</tu-tab-pane>
    <tu-tab-pane :name="3" label="第三章">我是第三章</tu-tab-pane>
  </tu-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(2)
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
