<template>
  <tu-switch v-model:value="value" />
  <tu-switch v-model:value="value" square />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>
