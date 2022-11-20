<template>
  <tu-button :icon="CheckCircle">成功</tu-button>
  <tu-button :icon="WarningCircle" icon-position="right">提示</tu-button>
</template>

<script setup lang="ts">
import { CheckCircle, WarningCircle } from 'tulp/icons'
</script>