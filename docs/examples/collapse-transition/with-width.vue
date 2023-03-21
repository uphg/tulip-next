<template>
  <tu-button @click="visible = !visible">Toggle</tu-button>

  <div style="overflow: hidden; height: 100px; margin-top: 12px;">
    <tu-collapse-transition with-width>
      <div v-show="visible" class="collapse-box"></div>
    </tu-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</script>

<style>
.collapse-box {
  color: #ffffff;
  background-color: var(--vp-c-brand);
  width: 200px;
  height: 100px;
}
</style>
