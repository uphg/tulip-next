<template>
  <tu-space>
    <tu-tooltip content="死亡不是失去了生命，而是走出了时间">
      <template #trigger>
        <tu-button>悬浮</tu-button>
      </template>
    </tu-tooltip>
    <tu-tooltip content="死亡不是失去了生命，而是走出了时间" trigger="click">
      <template #trigger>
        <tu-button>点击</tu-button>
      </template>
    </tu-tooltip>
    <tu-tooltip :visible="visible" content="死亡不是失去了生命，而是走出了时间" trigger="manual">
      <template #trigger>
        <tu-button @click="visible = !visible">手动</tu-button>
      </template>
    </tu-tooltip>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>