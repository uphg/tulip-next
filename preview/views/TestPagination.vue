<template>
  <div>
    <tu-pagination v-model:current="current" :total="100" :page-size="10" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>