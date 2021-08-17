<template>
  <header class="navbar" @click.stop>
    <div class="navbar-left">
      <button class="sidebar-button" @click="toggleSidebar">{{ sidebarVisible ? '关闭' : '开启' }}</button>
      <router-link
        class="logo-link"
        to="/home"
      >logo</router-link>
    </div>
    <NavLinks />
  </header>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'
import NavLinks from './NavLinks.vue'

export default defineComponent({
  components: { NavLinks },
  setup() {
    const sidebarVisible = inject<Ref<boolean>>('sidebarVisible')
    const updateSidebarVisible = inject<(value: boolean)=>void>('updateSidebarVisible')
    const toggleSidebar = () => {
      updateSidebarVisible && updateSidebarVisible(Boolean(!(sidebarVisible && sidebarVisible.value)))
    }

    return { sidebarVisible, toggleSidebar }
  }
})
</script>
<style lang="scss">
.navbar {
  padding: 12px 24px;
  height: 60px;
  line-height: 2.2;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  .nav-links {
    display: flex;
  }
  .nav-item:not(:first-child) {
    margin-left: 10px;
  }
  .nav-link {
    color: inherit;
    text-decoration: none;
    padding: 0 10px;
  }
  .nav-link-active {
    color: #3eaf7c;
  }
  .navbar-left {
    width: calc(320px - 24px);
  }

  .sidebar-button {
    display: none;
    margin-right: 10px;
  }

  @media (max-width: 719px) {
    .sidebar-button {
      display: inline-block;
    }
    .nav-links {
      display: none;
    }
  }
}
</style>
