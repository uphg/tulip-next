<template>
  <tu-layout direction="row" height="360px">
    <tu-sidebar :collapsed="collapsed">Sidebar</tu-sidebar>
    <tu-layout grow="1" height="100%">
      <tu-header>
        <tu-button hue="primary" size="small" @click="triggerCollapsed">点击折叠侧栏</tu-button>
        <span>header</span>
      </tu-header>
      <tu-content height="calc(100% - 140px)" style="overflow-y: scroll;">
        <p v-for="item in 20" :key="item">中关村，中关村，中关村</p>
      </tu-content>
      <tu-footer>Footer</tu-footer>
    </tu-layout>
  </tu-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)

function triggerCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<style scoped>
.tu-layout-header,
.tu-layout-footer {
  padding: 24px;
  background: #b3c0d1;
}

.tu-layout-sidebar {
  padding: 24px;
  background: #d3dce6;
}

.tu-layout-content {
  padding: 24px;
  background: #e9eef3;
}
</style>