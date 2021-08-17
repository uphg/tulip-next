<template>
  <router-link
    class="sidebar-link"
    :class="{ 'sidebar-link-active': activeClass }"
    :to="path"
  >{{ meta.title }}</router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    path: String,
    meta: Object,
    activeClass: Boolean
  }
})
</script>
<style lang="scss">
.sidebar-link {
  color: inherit;
  text-decoration: none;
  &.sidebar-link-active {
    color: #3eaf7c;
  }
}
</style>
