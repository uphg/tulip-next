<template>
  <tu-button @click="open">点击打开</tu-button>
  <tu-dialog
    v-model:visible="visible"
    render-directive="show"
    custom
    :mask-closable="false"
    @mask-click="onMaskClick"
  >
    <div class="dialog-block">
      <p>我是自定义内容</p>
      <div class="dialog-options">
        <tu-button type="info" @click="close">关闭</tu-button>
        <tu-button type="success" @click="close">确认</tu-button>
      </div>
    </div>
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

const onMaskClick = (event: Event) => {
  console.log('禁止关闭！')
  console.log(event)
}
</script>

<style>
.dialog-block {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  color: #fff;
}
.dialog-block .dialog-options {
  display: flex;
  justify-content: flex-end;
}
.dialog-block .tu-button {
  margin-left: 10px;
}
.dialog-block .tu-button > p {
  padding: 0 0 20px;
}
</style>
