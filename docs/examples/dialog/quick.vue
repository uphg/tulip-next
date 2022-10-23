<template>
  <t-button @click="openSuccess">成功</t-button>
  <t-button @click="openWarning">警告</t-button>
  <t-button @click="openInfo">信息</t-button>
  <t-button @click="openError">错误</t-button>
</template>

<script setup lang="ts">
import { useDialog } from '../../lib/index'

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
    content: '我要警告你'
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
