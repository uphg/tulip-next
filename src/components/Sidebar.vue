<template>
  <aside class="sidebar" @click.stop>
    <NavLinks />
    <SidebarLinks />
  </aside>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import NavLinks from './NavLinks.vue'
import SidebarLinks from './SidebarLinks.vue'

export default defineComponent({
  components: { NavLinks, SidebarLinks },
  setup () {
    const navbarLinks = inject('navbarLinks')

    return { navbarLinks }
  }
})
</script>
<style lang="scss">
.sidebar {
  box-sizing: border-box;
  width: 320px;
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-right: 1px solid #eaecef;
  background-color: #fff;
  &.open {
    transform: translateX(0);
    transition: transform .2s ease;
  }
  .nav-links {
    display: none;
    padding: 18px 24px;
    border-bottom: 1px solid #eaecef;
  }
  .nav-item {
    padding: 6px 0;
  }
  .nav-link {
    font-size: 18px;
    font-weight: bold;
    color: inherit;
    text-decoration: inherit;
    &.nav-link-active {
      color: #3eaf7c;
    }
  }
  @media (max-width: 719px) {
    transform: translateX(-100%);
    transition: transform .2s ease;
    .nav-links {
      display: block;
    }
  }
}

</style>
