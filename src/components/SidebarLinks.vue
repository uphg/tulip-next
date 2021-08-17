<template>
  <div class="sidebar-links">
    <div
      class="sidebar-item"
      v-for="(link, index) in sidebarLinks"
      :key="'route' + index"
    >
      <SidebarLink
        :active-class="index === sidebarIndex"
        :path="link.path"
        :meta="link.meta"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, Ref } from 'vue'
import { useRoute } from 'vue-router'
import SidebarLink from './SidebarLink.vue'
import { UpdateSidebarLinksFunc } from '../app-type'
import { LinkType } from '../router';

export default defineComponent({
  components: { SidebarLink },
  setup () {
    const route = useRoute()
    const children = route.matched[0].children

    const sidebarIndex = inject('sidebarIndex')
    const updateSidebarIndex = inject<Function>('updateSidebarIndex')
    const sidebarLinks = inject('sidebarLinks')
    const updateSidebarLinks = inject<UpdateSidebarLinksFunc>('updateSidebarLinks')
    const hasHidden = (item: LinkType): boolean => !item.hidden

    onMounted(() => {
      const sidebars = (children as Array<LinkType>).filter((item): boolean => !item.hidden)
      updateSidebarLinks && updateSidebarLinks(sidebars)
      updateSidebarIndex && updateSidebarIndex(route)
    })

    return { sidebarIndex, sidebarLinks }
  }
})
</script>
<style lang="scss">
.sidebar-links {
  padding: 18px 24px;
}
.sidebar-item {
  padding: 4px 0;
}
</style>
