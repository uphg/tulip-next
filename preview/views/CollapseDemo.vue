<template>
  <div>
    <h2>Collapse 基础用法</h2>
    <tu-collapse v-model:active-names="activeNames">
      <tu-collapse-item title="标题1" name="1">内容1</tu-collapse-item>
      <tu-collapse-item title="标题2" name="2">内容2</tu-collapse-item>
      <tu-collapse-item title="标题3" name="3">内容3</tu-collapse-item>
    </tu-collapse>

    <h2>Collapse 手风琴</h2>
    <tu-collapse v-model:active-names="activeNames" accordion>
      <tu-collapse-item title="标题1" name="1">内容1</tu-collapse-item>
      <tu-collapse-item title="标题2" name="2">内容2</tu-collapse-item>
      <tu-collapse-item title="标题3" name="3">内容3</tu-collapse-item>
    </tu-collapse>
    <tu-button @click="triggerArray">点击改变数组</tu-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const activeNames = ref([])

console.log(activeNames)

let index = -1
function triggerArray() {
  activeNames.value[++index] = 1
  console.log([...activeNames.value])
}

watch(activeNames, (newValue) => {
  console.log('activeNames 改变')
  console.log('newValue')
  console.log(newValue)
})
</script>