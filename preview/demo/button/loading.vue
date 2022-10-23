<template>
  <t-button icon="success" :loading="loading" @click="loading = !loading">点我</t-button>
  <t-button :loading="loading" @click="loading = !loading">点我</t-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref<boolean>(false)
</script>
