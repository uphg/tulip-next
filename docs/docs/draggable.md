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

## Draggable 属性 & useDraggable Option 参数

| 名称             | 说明                                             | 类型                       | 默认值           |
| ---------------- | ------------------------------------------------ | -------------------------- | ---------------- |
| initial-value    | 初始位置值                                       | `{ x: number, y: number }` | `{ x: 0, y: 0 }` |
| dragging-element | 附加 `'pointermove' `和 `'pointerup'` 事件的元素 | `Element \| Window`        | `Window`         |



<script setup lang="ts">
import DraggableBase from '../examples/draggable/base.vue'
import DraggableComposition from '../examples/draggable/composition.vue'
</script>
