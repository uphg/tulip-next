<template>
  <h2>默认尺寸</h2>
  <tu-scrollbar ref="scrollbar" class="demo-scrollbar">
    <p v-for="item in 15" :key="item">Hi, Jack {{ item }}</p>
    <p style="width: 800px;">
      <span v-for="item in 100" :key="item + 'a'">Hi, Jack {{ item }}</span>
    </p>
  </tu-scrollbar>
  <h2>大尺寸</h2>
  <tu-scrollbar ref="scrollbar" size="large" trigger="none" class="demo-scrollbar2">
    <p v-for="item in 15" :key="item">Hi, Jack {{ item }}</p>
    <p style="width: 800px;">
      <span v-for="item in 100" :key="item + 'a'">Hi, Jack {{ item }}</span>
    </p>
  </tu-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TuScrollbar } from 'src/components'

const scrollbar = ref<typeof TuScrollbar | null>(null)

onMounted(() => {
  scrollbar.value.scrollTo({ top: 200 })
})
</script>

<style lang="stylus">
.demo-scrollbar {
  width: 300px;
  height: 300px;
  border: 1px solid #0078d7;
}

.demo-scrollbar2 {
  width: 300px;
  height: 300px;
  border: 1px solid #0078d7;
}
</style>