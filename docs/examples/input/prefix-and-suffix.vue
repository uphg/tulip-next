<template>
  <div class="space">
    <t-input v-model:value="value" placeholder="请输入内容">
      <template #prefix>
        ￥
      </template>
    </t-input>
    <t-input v-model:value="value" placeholder="请输入内容">
      <template #suffix>
        元
      </template>
    </t-input>
    <t-input v-model:value="value" placeholder="请输入内容">
      <template #prefix>
        http://
      </template>
      <template #suffix>
        .com
      </template>
    </t-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

