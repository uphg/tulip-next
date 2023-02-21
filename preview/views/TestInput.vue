<template>
  <tu-space class="input-demo" vertical>
    <tu-button hue="primary">Default</tu-button>
    <tu-input v-model:value="value"></tu-input>
    <tu-input v-model:value="value" loading></tu-input>
    <tu-input v-model:value="value" clearable></tu-input>
    <tu-input v-model:value="value" status="success"></tu-input>
    <tu-input v-model:value="value" status="warning"></tu-input>
    <tu-input v-model:value="value" status="error"></tu-input>

    <tu-input v-model:value="value" status="success" loading></tu-input>
    <tu-input v-model:value="value" status="warning" loading></tu-input>
    <tu-input v-model:value="value" status="error" loading></tu-input>

    <tu-input v-model:value="value" status="success" clearable></tu-input>
    <tu-input v-model:value="value" status="warning" clearable></tu-input>
    <tu-input v-model:value="value" status="error" clearable></tu-input>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style>
.input-demo {
  padding: 120px 60px;
}
</style>