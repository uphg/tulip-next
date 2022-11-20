<template>
  <tu-button>默认按钮</tu-button>
  <tu-button round>圆角按钮</tu-button>
  <tu-button :icon="CheckCircle" circle />
</template>

<script setup lang="ts">
import { CheckCircle } from 'tulp/icons'
</script>