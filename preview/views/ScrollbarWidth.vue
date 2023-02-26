<template>
  <div>
    测试默认滚动条高度
    <p v-for="item in 100" :key="item">{{'hi' + item}}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getScrollbarWidth } from '../../src/utils/getScrollbarWidth'

onMounted(() => {
  setTimeout(() => {
    const width = getScrollbarWidth()
    console.log('width')
    console.log(width)
  })
})
</script>