<template>
  <tu-scrollbar trigger="none" style="height: 100vh"  :on-scroll="onScroll">
    <p v-for="item in 20" :key="item">Hi, I'm Jack{{ item }}</p>
    <tu-image src="https://sponsors.vuejs.org/images/chrome_frameworks_fund.png"/>
    <tu-image width="200px" height="100px" object-fit="contain" src="https://sponsors.vuejs.org/images/chrome_frameworks_fund.png"/>
    <tu-image-group>
      <tu-space>
        <tu-image width="200px" src="/images/1.jpg"/>
        <tu-image width="200px" src="/images/2.jpg"/>
        <tu-image width="200px" src="/images/3.jpg"/>
      </tu-space>
    </tu-image-group>
  </tu-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const divRef = ref(null)

function onScroll() {
  // console.log('滚动了')
}

// onMounted(() => {
//   console.log('divRef.value')
//   console.log(divRef.value.offsetHeight)
// })
</script>