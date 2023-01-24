<template>
  <tu-draggable
    class="drag-demo"
    :initial-value="{ x: 200, y: 200 }"
    v-slot="{ x, y }">
    拖拽 1 号<br>x：{{ x }}<br>y：{{ y }}
  </tu-draggable>
</template>

<style scoped>
.drag-demo {
  width: 240px;
  padding: 8px 16px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
}
</style>
