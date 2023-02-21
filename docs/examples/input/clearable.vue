<template>
  <tu-input v-model:value="value" placeholder="可清空" clearable/>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
