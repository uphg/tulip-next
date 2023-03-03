<template>
  <tu-space item-style="display: flex;" align="center">
    <tu-checkbox v-model:checked="checkedValue" label="Option 1"/>
    <tu-checkbox v-model:checked="checkedValue"/>
    <tu-checkbox v-model:checked="checkedValue" label="Option 2" disabled/>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref(false)
</script>