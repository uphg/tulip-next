<template>
  <tu-space vertical>
    <tu-input v-model:value="value" placeholder="小" size="small"/>
    <tu-input v-model:value="value" placeholder="中"/>
    <tu-input v-model:value="value" placeholder="大" size="large"/>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
