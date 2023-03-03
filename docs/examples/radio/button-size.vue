<template>
  <tu-space vertical>
    <tu-radio-group v-model:value="checkedValue" size="small">
      <tu-radio-button v-for="option in options" :key="option" :value="option">
        {{ option }}
      </tu-radio-button>
    </tu-radio-group>
    <tu-radio-group v-model:value="checkedValue">
      <tu-radio-button v-for="option in options" :key="option" :value="option">
        {{ option }}
      </tu-radio-button>
    </tu-radio-group>
    <tu-radio-group v-model:value="checkedValue" size="large">
      <tu-radio-button v-for="option in options" :key="option" :value="option">
        {{ option }}
      </tu-radio-button>
    </tu-radio-group>
  </tu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedValue = ref('')

const options = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'])
</script>
