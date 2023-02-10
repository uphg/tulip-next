<template>
  <div class="selection-input-demo">
    <div><tu-selection-input :value="value" placeholder="请输入内容" /></div>
    <div><tu-button @click="add">添加内容</tu-button></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

function add() {
  value.value += '你好，'
}
</script>

<style>
.selection-input-demo {
  padding: 36px;
  display: flex;
}
</style>