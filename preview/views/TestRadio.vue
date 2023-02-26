<template>
  <div class="radio-demo">
    <h2>Radio</h2>
    <div>
      <tu-radio :checked="value === '1'" value="1" @change="handleChange">标签1</tu-radio>
      <tu-radio :checked="value === '2'" value="2" @change="handleChange" disabled>标签2</tu-radio>
      <tu-radio :checked="value === '3'" value="3" @change="handleChange" disabled>禁用</tu-radio>
    </div>
    <h2>Radio 组</h2>
    <div>
      <tu-radio-group v-model:value="value2" name="radiogroup">
        <tu-space>
          <tu-radio v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </tu-radio>
        </tu-space>
      </tu-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('3')
const value2 = ref(2)

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  value.value = target.value
}

const options = ref(['Option 1', 'Option 2', 'Option 3'].map((item, index) => ({ label: item, value: index })))
</script>

<style>
.radio-demo {
  padding: 120px;
}
</style>