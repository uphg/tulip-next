<template>
  <tu-scrollbar ref="scrollbar" class="demo-scrollbar" direction-x>
    <p v-for="item in 50" :key="item">Hi, Jack {{ item }}</p>
    <p style="width: 1000px;">
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
  width: 500px;
  height: 500px;
  border: 1px solid #0078d7;
}
</style>