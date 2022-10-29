<template>
  <tu-pagination v-model:current="current" :total="57" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>