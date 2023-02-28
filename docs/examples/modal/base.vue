<template>
  <tu-button @click="visible =! visible">点我</tu-button>
  <tu-modal v-model:visible="visible">
    <tu-card title="模态框" :bordered="false">
      我是内容
    </tu-card>
  </tu-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>