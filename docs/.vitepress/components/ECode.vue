<template>
  <div class="e-code language-vue" v-html="decodeURIComponent(html)" />
</template>

<script setup lang="ts">
defineProps({
  html: {
    type: String,
    default: ''
  }
})
</script>

