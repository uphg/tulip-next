<template>
  <div class="e-code language-vue" v-html="code && decodeURIComponent(code)" />
</template>

<script setup lang="ts">
const props = defineProps({
  code: String
})
</script>

