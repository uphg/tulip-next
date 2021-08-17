<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide, readonly, ref, onMounted, nextTick } from 'vue'
import { routes, router, LinkType } from './router/index'

export default defineComponent({
  name: 'App',
  setup () {
    const navbarIndex = ref(0)
    const navbarLinks = ref(routes.filter(item => !item.hidden))
    const sidebarVisible = ref(false)
    const sidebarIndex = ref(0)
    const sidebarLinks = ref<Array<LinkType>>([])

    const updateNavbarIndex = (route: any) => {
      const name = route.matched[0].name
      const links = navbarLinks.value
      for (let i = 0; i < links.length; i++) {
        const link = links[i]
        if (link.name === name) {
          navbarIndex.value = i
          break
        }
      }
    }

    const updateSidebarVisible = (value: boolean): void => {
      sidebarVisible.value = value
    }

    const closeSidebar = (): void => {
      document.addEventListener('click',(e: Event) => {
        updateSidebarVisible(false)
      })
    }

    const updateSidebarLinks = (links: Array<LinkType> = []) => {
      sidebarLinks.value = links.filter(item => !(item.hidden))
    }

    const updateSidebarIndex = (route: any) => {
      const name = route.name
      const links = sidebarLinks.value
      for (let i = 0; i < links.length; i++) {
        if (links[i].name === name) {
          sidebarIndex.value = i
          break
        }
      }
    }

    // provide 参考: https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html#响应性
    provide('navbarIndex', readonly(navbarIndex))
    provide('navbarLinks', readonly(navbarLinks))
    provide('sidebarVisible', readonly(sidebarVisible))
    provide('sidebarIndex', readonly(sidebarIndex))
    provide('sidebarLinks', readonly(sidebarLinks))
    provide('updateSidebarLinks', updateSidebarLinks)
    provide('updateSidebarIndex', updateSidebarIndex)
    provide('updateSidebarVisible', updateSidebarVisible)

    onMounted(closeSidebar)

    router.beforeEach((to, from) => {
      updateNavbarIndex(to)
      updateSidebarIndex(to)
    })

    router.afterEach(() => {
      // 每次点击路由后关闭弹框
      updateSidebarVisible(false)
    })
  }
})
</script>
