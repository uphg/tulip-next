<template>
  <tu-space style="margin-bottom: 20px;">
    <tu-button @click="add">点我添加</tu-button>
    <tu-button @click="remove">点我减少</tu-button>
    <tu-button @click="updateKey">刷新组件</tu-button>
  </tu-space>
  <tu-scrollbar :key="key" class="demo-scrollbar" direction-x>
    <p v-for="item in list" :key="item">Hi, Jack {{ item }}</p>
    <!-- <p style="width: 800px;">
      <span v-for="item in 100" :key="item + 'a'">Hi, Jack {{ item }}</span>
    </p> -->
  </tu-scrollbar>
</template>

<script setup lang="ts">
import { TuScrollbar } from 'src/components'

import { ref } from 'vue'

const list = ref([1])

let count = 1
let key = 0

const add = () => {
  count+=1
  list.value.push(count)
}

const remove = () => {
  if (count <= 0) return
  count-=1
  list.value.splice(count, 1)
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