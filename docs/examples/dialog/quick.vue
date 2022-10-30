<template>
  <tu-button type="success" @click="openSuccess">成功</tu-button>
  <tu-button type="info" @click="openInfo">信息</tu-button>
  <tu-button type="warning" @click="openWarning">警告</tu-button>
  <tu-button type="error" @click="openError">错误</tu-button>
</template>

<script setup lang="ts">
import { useDialog } from '../../../src/index'

const dialog = useDialog()
const openSuccess = () => {
  dialog.success({
    title: '成功',
    content: '你成功了',
    confirm: () => {
      console.log('你确认了')
    },
    cancel: () => {
      console.log('你取消了')
    }
  })
}
const openWarning = () => {
  dialog.warning({
    title: '警告',
    content: '这是警告窗口'
  })
}
const openInfo = () => {
  dialog.info({
    title: '信息',
    content: '这是信息窗口'
  })
}
const openError = () => {
  dialog.error({
    title: '错误',
    content: '这是错误窗口'
  })
}
</script>
