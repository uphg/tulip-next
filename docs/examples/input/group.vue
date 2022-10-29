<template>
  <div class="space">
    <tu-input-group>
      <tu-input-group-label>￥</tu-input-group-label>
      <tu-input v-model:value="value" placeholder="请输入内容" />
    </tu-input-group>
    <tu-input-group>
      <tu-input v-model:value="value" placeholder="请输入内容" />
      <tu-input-group-label>元</tu-input-group-label>
    </tu-input-group>
    <tu-input-group>
      <tu-input-group-label>http://</tu-input-group-label>
      <tu-input v-model:value="value" placeholder="请输入内容" />
      <tu-input-group-label>.com</tu-input-group-label>
    </tu-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
