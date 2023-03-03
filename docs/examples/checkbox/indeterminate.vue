<template>
  <tu-space item-style="display: flex;" align="center">
    <tu-checkbox v-model:checked="checkedValue" :indeterminate="indeterminate" label="Option 1"/>
    <tu-checkbox v-model:checked="checkedValue" :indeterminate="indeterminate"/>
    <tu-checkbox v-model:checked="checkedValue" :indeterminate="indeterminate" label="Option 2" disabled/>
    <tu-button size="small" @click="checkedValue = !checkedValue">选中</tu-button>
    <tu-button size="small" @click="indeterminate = !indeterminate">部分选中</tu-button>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref(false)
const indeterminate = ref(false)
</script>