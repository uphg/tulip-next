<template>
  <t-button icon="success" :loading="loading" @click="onClick">点我</t-button>
  <t-button :loading="loading" @click="onClick">点我</t-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref<boolean>(false)
const onClick = () => loading.value = !loading.value
</script>
