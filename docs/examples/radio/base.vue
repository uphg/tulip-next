<template>
  <tu-space item-style="display: flex;" align="center">
    <tu-radio
      :checked="checkedValue === '1'"
      value="1"
      @change="handleChange"
    >Option 1</tu-radio>
    <tu-radio
      :checked="checkedValue === '2'"
      value="2"
      label="Option 2"
      @change="handleChange"
    />
    <tu-radio
      :checked="checkedValue === '3'"
      value="3"
      @change="handleChange"
      :disabled="disabled"
    >Option 3</tu-radio>
    <tu-switch v-model:value="disabled">
      <template #checked>启用</template>
      <template #unchecked>禁用</template>
    </tu-switch>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref('')
const disabled = ref(false)

function handleChange(e: Event) {
  checkedValue.value = (e.target as HTMLInputElement).value
}
</script>