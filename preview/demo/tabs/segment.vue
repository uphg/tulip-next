<template>
  <h2>白雪公主</h2>
  <t-tabs v-model:value="value" type="segment">
    <t-tab-pane :name="1" label="第一章">我是第一章</t-tab-pane>
    <t-tab-pane :name="2" label="第二章">我是第二章</t-tab-pane>
    <t-tab-pane :name="3" label="第三章">我是第三章</t-tab-pane>
  </t-tabs>
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
