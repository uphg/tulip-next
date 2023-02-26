<template>
  <tu-space>
    <tu-button @click="openSuccess">成功</tu-button>
    <tu-button @click="openWarning">警告</tu-button>
    <tu-button @click="openError">错误</tu-button>
  </tu-space>
</template>

<script setup lang="ts">
import { useDialog } from '../../../src/index'

const dialog = useDialog()
const openSuccess = () => {
  dialog.success({
    title: '成功',
    content: '你成功了',
    confirmText: '确定',
    cancelText: '取消',
    onConfirm: () => console.log('你确认了'),
    onCancel: () => console.log('你取消了')
  })
}
const openWarning = () => {
  dialog.warning({
    title: '警告',
    content: '这是警告窗口',
    confirmText: '噢'
  })
}

const openError = () => {
  dialog.error({
    title: '错误',
    content: '这是错误窗口',
    confirmText: '好吧'
  })
}
</script>
