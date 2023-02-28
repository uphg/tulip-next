<template>
  <button @click="visible = !visible">点击切换</button>
  <Transition name="fade" mode="out-in">
    <span v-if="visible">hi</span>
    <span v-else>hello</span>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>