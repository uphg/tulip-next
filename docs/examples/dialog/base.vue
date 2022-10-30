<template>
  <tu-button @click="openDialog">点击打开</tu-button>
  <tu-dialog
    v-model:visible="visible"
    title="我是标题"
  >
    <template #header>
      <span>我是标题</span>
    </template>
    <p>我只想保持本色</p>
    <p>和少年的心气</p>
    <template #footer>
      <tu-button
        size="small"
        @click="visible = false"
      >取消</tu-button>
      <tu-button
        type="primary"
        size="small"
        @click="visible = false"
      >确定</tu-button>
    </template>
  </tu-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const openDialog = () => {
  visible.value = true
}
</script>
