<template>
  <h2>Checkbox 复选框</h2>
  <tu-space item-style="display: flex;" align="center">
    <tu-checkbox v-model:checked="checked" label="选项1"/>
    <tu-checkbox v-model:checked="checked"/>
    <tu-checkbox v-model:checked="checked" label="选项2" disabled/>
  </tu-space>
  <h2>Checkbox 复选框</h2>
  <tu-space>
    <tu-checkbox v-model:checked="checked2" :indeterminate="indeterminate" label="Checkbox"/>
    <tu-button size="small" @click="clickChecked">选中</tu-button>
    <tu-button size="small" @click="clickIndeterminate">部分选中</tu-button>
  </tu-space>
  <h2>复选框组</h2>
  <tu-checkbox-group v-model:value="cities">
    <tu-space item-style="display: flex;">
      <tu-checkbox value="Beijing" label="北京" />
      <tu-checkbox value="Shanghai" label="上海" />
      <tu-checkbox value="Guangzhou" label="广州" />
      <tu-checkbox value="Shenzen" label="深圳" />
    </tu-space>
  </tu-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
const checked2 = ref(false)
const indeterminate = ref(false)
const cities = ref([])

function clickChecked() {
  checked.value = !checked.value
}

function clickIndeterminate() {
  indeterminate.value = !indeterminate.value
}
</script>
