<template>
  <tu-button @click="visible = !visible">Toggle</tu-button>

  <div style="overflow: hidden; height: 250px; padding: 20px 0;">
    <tu-collapse-transition>
      <div v-show="visible">
        <div class="collapse-box">collapse-transition</div>
        <div class="collapse-box">collapse-transition</div>
      </div>
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
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.collapse-box:not(:last-child) {
  margin-bottom: 10px;
}
</style>
