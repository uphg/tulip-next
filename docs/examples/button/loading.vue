<template>
  <tu-button :icon="CheckCircle" :loading="loading" @click="onClick">点我</tu-button>
  <tu-button :loading="loading" @click="onClick">点我</tu-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle } from 'tulip/icons'

const loading = ref<boolean>(false)
const onClick = () => loading.value = !loading.value
</script>
