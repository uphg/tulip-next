<template>
  <div class="cascader-demo">
    <tu-cascader v-model:value="value" :options="options"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(null)
const options = ref([])
</script>

<style lang="stylus">
.cascader-demo
  padding 36px
</style>