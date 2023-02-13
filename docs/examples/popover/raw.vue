<template>
  <tu-popup :visible="visible" popup-margin="6">
    <template #trigger>
      <tu-button @click="visible = !visible">点我</tu-button>
    </template>
    <div style="background-color: #039be5; width: 100px; height: 100px;">
      自定义内容
    </div>
  </tu-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>