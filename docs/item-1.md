# Item 1

::: demo

button/base

:::

<div class="tu-collapse-transition--active"></div>

```vue
<template>
  <h1>Hello</h1>
</template>
```

<script setup lang="ts">
import ButtonBase from './examples/button/base.vue'
</script>

<style>
.tu-collapse-transition--active {
  transition: all 0.3s;
}
.tu-button {
  margin-right: 10px;
}
</style>