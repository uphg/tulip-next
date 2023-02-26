<template>
  <div class="app-container">
    <div class="content">
      <component :is="current?.component"></component>
    </div>
  </div>
  <aside class="sidebar">
    <h2>Tulip UI</h2>
    <div
      :class="['sidebar-item', { active: item === current }]"
      v-for="item, index in sidebar"
      :key="index"
      @click="onClickSidebarItem(item)"
    >{{ item.title }}</div>
  </aside>
</template>

<script setup lang="ts">
import type { Component, PropType } from 'vue'

type SidebarItem = { title: string, component: Component }

defineProps({
  current: Object as PropType<SidebarItem>,
  sidebar: Array as PropType<SidebarItem[]>
})

const emits = defineEmits(['update:current'])

function onClickSidebarItem(item: SidebarItem) {
  emits('update:current', item)
}
</script>

<style>
:root {
  --sidebar-width: 280px;
}

.app-container {
  padding: 32px 24px;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
}
.sidebar {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--sidebar-width);
  padding: 64px 32px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}
.content {
  max-width: 980px;
  margin: 0 auto;
}

.sidebar-item {
  cursor: pointer;
  line-height: 24px;
  font-size: 14px;
  padding: 4px 0;
  transition: color 0.25s;
}

.sidebar-item:hover,
.sidebar-item.active {
  color: #1a73e8;
}

@media (max-width: 960px) {
  .sidebar {
    display: none;
  }
  .app-container {
    margin-left: 0;
  }
}
</style>

