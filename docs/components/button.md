# Button 按钮

带有丰富色彩的按钮

## 基本用法

使用 type 改变它的默认主题色

::: demo

button/base

:::

<div class="tu-collapse-transition--active"></div>


## 我是标题1

```vue
<template>
  <h1>Hello</h1>
</template>
```

<script setup lang="ts">
import ButtonBase from '../examples/button/base.vue'
</script>

<style>
.tu-collapse-transition--active {
  transition: all 0.3s;
}
.tu-button {
  margin-right: 10px;
}
</style>