<template>
  <t-button @click="openDialog">点击打开</t-button>
  <t-dialog
    v-model:visible="dialogVisible"
    title="我是标题"
  >
    <template #header>
      <span>我是标题</span>
    </template>
    <p>我只想保持本色</p>
    <p>和少年的心气</p>
    <template #footer>
      <t-button
        size="small"
        @click="dialogVisible = false"
      >取消</t-button>
      <t-button
        type="primary"
        size="small"
        @click="dialogVisible = false"
      >确定</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

const openDialog = () => {
  dialogVisible.value = true
}
</script>
