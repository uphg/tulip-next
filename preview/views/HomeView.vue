<template>
  <main>
    <button @click="visible = !visible">点击打开</button>
    <CollapseTransition>
      <div v-show="visible" class="demo"></div>
    </CollapseTransition>
  </main>
</template>

<script setup lang="ts">
import { CollapseTransition } from 'src/index'
import { ref } from 'vue';

const visible = ref(false)
</script>

<style>
.demo {
  height: 100px; width: 200px; background-color: black;
}
</style>