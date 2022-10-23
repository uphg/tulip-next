<template>
  <t-switch v-model:value="value" />
  <t-switch v-model:value="value" square />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>
