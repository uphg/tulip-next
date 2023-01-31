<template>
  <div class="app">
    <!-- <Sidebar />
    <main class="content">
      <RouterView />
    </main> -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<!-- <style scoped>
.content {
  margin-left: 240px;
}
</style> -->
