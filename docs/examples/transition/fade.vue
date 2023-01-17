<template>
  <tu-button @click="visible = !visible">Toggle</tu-button>
  <div style="display: flex; margin-top: 20px; height: 100px;">
    <transition name="tu-fade">
      <div v-if="visible" class="transition-box">Fade</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
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