<template>
  <div>
    <h2>拖拽 div</h2>
    <tu-draggable v-slot="{ x, y }">
      <div class="draggable-demo1">
        我可以拖拽 1 号<br><br>x：{{ x }}<br>y：{{ y }}
      </div>
    </tu-draggable>
    <div ref="draggable" class="draggable-demo2" :style="style">
      我可以拖拽 2 号<br><br>x：{{ x }}<br>y：{{ y }}
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
.draggable-demo1 {
  width: 200px;
  height: 100px;
  border: 1px solid #9ca3af4d;
}
.draggable-demo2 {
  position: fixed;
  touch-action: none;
  user-select: none;
  cursor: move;
  z-index: 24;
  width: 200px;
  height: 100px;
  border: 1px solid #9ca3af4d;
}
</style>