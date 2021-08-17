<template>
  <router-link
    class="nav-link"
    :class="{ 'nav-link-active': activeClass }"
    :to="`${link.path === '/' ? '' : link.path}/${link.children[0].path}`"
    @click="clickLinks({ children: link.children })"
  >{{ link.meta && link.meta.title || link.name }}</router-link>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'
import { LinkType } from '../router'
import { UpdateSidebarLinksFunc } from '../app-type'

export default defineComponent({
  name: 'NavLink',
  props: {
    link: Object,
    activeClass: Boolean
  },
  setup () {
    const updateSidebarLinks = inject<UpdateSidebarLinksFunc>('updateSidebarLinks')
    const clickLinks = ({ children }: { children: LinkType[] }) => {
      updateSidebarLinks && updateSidebarLinks(children)
    }

    return { clickLinks }
  }
})
</script>
