<template>
  <tu-radio-group v-model:value="checkedValue">
    <tu-space>
      <tu-radio v-for="option in options" :key="option" :value="option">
        {{ option }}
      </tu-radio>
    </tu-space>
  </tu-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref('') 

const options = ref(['Option 1', 'Option 2', 'Option 3'])
</script>
