# Draggable 拖拽

可拖拽元素

## 基本用法

使用组件包裹元素

<<< @/examples/draggable/base.vue

## 组合式 API

也可以使用 useDraggableBase 添加拖拽

<<< @/examples/draggable/composition.vue

<DraggableBase />
<DraggableComposition />

<script setup lang="ts">
import DraggableBase from '../examples/draggable/base.vue'
import DraggableComposition from '../examples/draggable/composition.vue'
</script>
