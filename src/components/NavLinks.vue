<template>
  <div class="nav-links">
    <div
      class="nav-item"
      v-for="(link, index) in navbarLinks"
      :key="'route' + index"
    >
      <NavLink
        :active-class="index === navbarIndex"
        :link="link"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import NavLink from './NavLink.vue'

export default defineComponent({
  components: { NavLink },
  setup () {
    const navbarIndex = inject('navbarIndex')
    const navbarLinks = inject('navbarLinks')

    return { navbarLinks, navbarIndex }
  }
})
</script>
