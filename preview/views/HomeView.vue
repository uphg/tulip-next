<template>
  <main>
    <div>
      <Test />
      <TestCollapseTransition />
    </div>
  </main>
</template>

<script setup lang="ts">
import Test from './Test.vue'
import TestCollapseTransition from './TestCollapseTransition.vue'
</script>

<style>
.demo {
  width: 200px;
}
</style>