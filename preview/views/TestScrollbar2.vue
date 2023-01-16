<template>
  <tu-space style="margin-bottom: 20px;">
    <tu-button @click="add">点我添加</tu-button>
    <tu-button @click="remove">点我减少</tu-button>
    <tu-button @click="updateKey">刷新组件</tu-button>
  </tu-space>
  <tu-scrollbar :key="key" class="demo-scrollbar" direction-x>
    <p v-for="item in 30" :key="item">Hi, Jack {{ item }}</p>
    <p style="width: max-content">
      <span v-for="item in listx" :key="item + 'a'">Hi, Jack {{ item }}</span>
    </p>
  </tu-scrollbar>
</template>

<script setup lang="ts">
import { TuScrollbar } from 'src/components'

import { ref } from 'vue'

// Jack 19 的 19 在最底部删除 4 个时复现（滚动条突出）
const listy = ref(Array.from({ length: 22 }).map((_, index) => index + 1))
// Jack 15 的 15 在最右侧删除 1 - 2 个时复现（滚动条突出）
const listx = ref(Array.from({ length: 17 }).map((_, index) => index + 1))

let count = listx.value.length
let key = 0

const add = () => {
  count+=1
  listx.value.push(count)
}

const remove = () => {
  if (count <= 0) return
  count-=1
  listx.value.splice(count, 1)
}

const updateKey = () => {
  key+=1
}
</script>

<style lang="stylus">
.demo-scrollbar {
  width: 500px;
  height: 500px;
  border: 1px solid #0078d7;
}
</style>