<template>
  <tu-input v-model:value="value" placeholder="加载中..." loading/>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
