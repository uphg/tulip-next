<template>
  <div>
    <h2>拖拽 div</h2>
    <tu-draggable>
      <div class="draggable-demo">
        我可以拖拽
      </div>
    </tu-draggable>
    <div ref="draggable" class="draggable-demo" :style="style">
      我可以拖拽2号，x：{{ x }}，y：{{ y }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from 'src/index'
import { ref } from 'vue'

const draggable = ref(null)
const { x, y, style } = useDraggable(draggable, { initialValue: { x: 100, y: 100 } })!

</script>

<style scoped>
.draggable-demo {
  position: fixed;
  user-select: none;
  cursor: move;
  z-index: 24;
  width: 200px;
  height: 200px;
  border: 1px solid #9ca3af4d;
}
</style>