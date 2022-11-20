<template>
  <tu-pagination v-model:current="current" :total="1001" :page-size="10" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(5)
</script>