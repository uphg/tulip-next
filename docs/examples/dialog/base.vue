<template>
  <tu-button @click="open">点击打开</tu-button>
  <tu-dialog
    v-model:visible="visible"
    title="我是标题"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  >
    <template #header>
      <span>我是标题</span>
    </template>
    <p>我只想保持本色</p>
    <p>和少年的心气</p>
    <template #footer>
      <tu-button size="small" @click="close">取消</tu-button>
      <tu-button type="primary" size="small" @click="close">确定</tu-button>
    </template>
  </tu-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
}

const onOpen = () => {
  console.log('open')
}
const onOpened = () => {
  console.log('opened')
}
const onClose = () => {
  console.log('close')
}
const onClosed = () => {
  console.log('closed')
}
</script>
