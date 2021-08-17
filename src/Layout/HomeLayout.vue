<template>
  <div class="vue-docs-container">
    <Navbar />
    <Sidebar class="no-sidebar" :class="{ open: sidebarVisible }" />
    <main class="home">
      <div class="home-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

export default defineComponent({
  components: { Navbar, Sidebar },
  setup () {
    const sidebarVisible = inject<Ref<boolean>>('sidebarVisible')

    return { sidebarVisible }
  }
})
</script>

<style lang="scss" scoped>
.home-wrapper {
  max-width: 1260px;
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 0.02px;
  margin: {
    left: auto;
    right: auto;
  }
}
@media (min-width: 720px) {
  .no-sidebar {
    display: none;
  }
}

</style>
