<template>
  <t-switch v-model:value="value" size="small" />
  <t-switch v-model:value="value" />
  <t-switch v-model:value="value" size="large" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>
