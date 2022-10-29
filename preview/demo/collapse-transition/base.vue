<template>
  <t-button @click="visible = !visible">点我</t-button>
  <div style="overflow: hidden; background-color: #eee;">
    <tu-collapse-transition>
      <div v-show="visible" style="margin: 20px 0; background-color: #4caf50;">
        <div class="collapse-box">collapse-transition</div>
        <div class="collapse-box">collapse-transition</div>
      </div>
    </tu-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<style>
.collapse-box {
  color: #ffffff;
  background-color: #1a73e8;
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
