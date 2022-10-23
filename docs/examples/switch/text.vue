<template>
  <t-switch v-model:value="value">
    <template #checked>我开启了</template>
    <template #unchecked>我关闭了</template>
  </t-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>
