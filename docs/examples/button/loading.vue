<template>
  <tu-button icon="success" :loading="loading" @click="onClick">点我</tu-button>
  <tu-button :loading="loading" @click="onClick">点我</tu-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref<boolean>(false)
const onClick = () => loading.value = !loading.value
</script>
