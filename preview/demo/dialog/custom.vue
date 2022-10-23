<template>
  <t-button @click="openCustom">点击打开</t-button>
  <t-dialog
    v-model:visible="customVisible"
    render-directive="show"
    preset="custom"
    :mask-closable="false"
    @mask-click="onMaskClick"
  >
    <div class="dialog-block">
      <p>我是自定义内容</p>
      <div class="dialog-options">
        <t-button
          type="info"
          @click="customVisible = false"
        >关闭</t-button>
        <t-button
          type="success"
          @click="customVisible = false"
        >确认</t-button>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customVisible = ref(false)

const openCustom = () => {
  customVisible.value = true
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
