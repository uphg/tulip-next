<template>
  <tu-button @click="visible = true">点我</tu-button>
  <tu-modal v-model:visible="visible">
    <tu-dialog
      status="success"
      title="模态框"
      content="我是内容"
      confirmText="确定"
      cancelText="取消"
      :onClose="close"
      :onConfirm="close"
      :onCancel="close"
    />
  </tu-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function close() {
  visible.value = false
}
</script>