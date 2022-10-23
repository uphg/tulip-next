<template>
  <t-switch
    v-model:value="value"
    :checked-value="1"
    :unchecked-value="0"
  />
  <t-switch
    v-model:value="value2"
    checked-value="hi"
    unchecked-value="hello"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
const value2 = ref('hi')
</script>
