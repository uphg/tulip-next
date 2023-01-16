<template>
  <h3>Y 轴</h3>
  <tu-space style="margin-bottom: 20px;">
    <tu-button @click="addY">Y 轴添加</tu-button>
    <tu-button @click="removeY">Y 轴减少</tu-button>
  </tu-space>
  <h3>X 轴</h3>
  <tu-space style="margin-bottom: 20px;">
    <tu-button @click="addX">X 轴添加</tu-button>
    <tu-button @click="removeX">X 轴减少</tu-button>
  </tu-space>
  <tu-scrollbar class="demo-scrollbar">
    <p v-for="item in listY" :key="item">Hi, Jack {{ item }}</p>
    <p style="width: max-content">
      <span v-for="item in listX" :key="item + 'a'">Hi, Jack {{ item }}</span>
    </p>
  </tu-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Jack 19 的 19 在最底部删除 4 个时复现（滚动条突出）
const listY = ref(Array.from({ length: 22 }).map((_, index) => index + 1))
// Jack 15 的 15 在最右侧删除 1 - 2 个时复现（滚动条突出）
const listX = ref(Array.from({ length: 17 }).map((_, index) => index + 1))

let count = listX.value.length
let key = 0

const addY = () => {
  count+=1
  listY.value.push(count)
}

const removeY = () => {
  if (count <= 0) return
  count-=1
  listY.value.splice(count, 1)
}

const addX = () => {
  count+=1
  listX.value.push(count)
}

const removeX = () => {
  if (count <= 0) return
  count-=1
  listX.value.splice(count, 1)
}

</script>

<style lang="stylus">
.demo-scrollbar {
  width: 500px;
  height: 500px;
  border: 1px solid #0078d7;
}
</style>