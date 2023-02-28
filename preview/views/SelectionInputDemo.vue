<template>
  <div class="selection-input-demo">
    <div><tu-selection-input :value="value" placeholder="请选择内容" /></div>
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

<style lang="stylus">
.selection-input-demo {
  padding-top: 120px;
  display: flex;
  .tu-selection-input {
    width: 320px;
  }
}
</style>