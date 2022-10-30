<template>
  <tu-button @click="index = 0">To 1</tu-button>
  <tu-button @click="index = 1">To 2</tu-button>
  <tu-button @click="index = 2">To 3</tu-button>
  <div style="display: flex; margin-top: 20px; height: 100px;">
    <transition name="tu-slide" mode="out-in">
      <div v-if="index === 0" class="transition-box">Slide 1</div>
      <div v-else-if="index === 1" class="transition-box">Slide 2</div>
      <div v-else class="transition-box">Slide 3</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)
</script>

<style>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>