<template>
  <tu-radio-group v-model:value="checkedValue">
    <tu-radio-button
      v-for="option, index in options"
      :key="option"
      :value="option"
      :disabled="index === 3" 
    >
      {{ option }}
    </tu-radio-button>
  </tu-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref('')

const options = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'])
</script>
