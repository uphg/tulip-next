<template>
  <div class="space">
    <tu-input v-model:value="value" placeholder="请输入内容">
      <template #prefix>$</template>
    </tu-input>
    <tu-input v-model:value="value" placeholder="请输入内容">
      <template #suffix>元</template>
    </tu-input>
    <tu-input v-model:value="value" placeholder="请输入内容">
      <template #prefix>http://</template>
      <template #suffix>.com</template>
    </tu-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

