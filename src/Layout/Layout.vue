<template>
  <div class="vue-docs-container">
    <Navbar />
    <Sidebar :class="{ open: sidebarVisible }" />
    <PageWrap>
      <router-view />
    </PageWrap>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import PageWrap from './components/PageWrap.vue'

export default defineComponent({
  components: { Navbar, Sidebar, PageWrap },
  setup() {
    const sidebarVisible = inject<Ref<boolean>>('sidebarVisible')

    return { sidebarVisible }
  }
})
</script>

