<template>
  <div ref="drag" class="drag-demo" :style="style">
    拖拽 2 号<br>x：{{ x }}<br>y：{{ y }}
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from '../../../src/index'
import { ref } from 'vue'

const drag = ref<HTMLElement | null>(null)
const { x, y, style } = useDraggable(drag, { initialValue: { x: 100, y: 100 } })
</script>

<style>
.drag-demo {
  position: fixed;
  touch-action: none;
  user-select: none;
  cursor: move;
  z-index: 24;
  width: 240px;
  padding: 8px 16px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
}
</style>