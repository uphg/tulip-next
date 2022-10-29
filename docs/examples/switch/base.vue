<template>
  <tu-switch v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>
