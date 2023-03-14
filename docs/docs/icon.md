# Icon 组件

图标组件

## 基本用法

可以引入内置组件，`is` 需要是一个 component 组件

::: demo

icon/base

:::

## 自定义内容

也可以使用插槽渲染

::: demo

icon/slot

:::

## Icon 属性

| 名称 | 说明             | 类型        | 默认值      |
| ---- | ---------------- | ----------- | ----------- |
| is   | 要展示的图标组件 | `Component` | `undefined` |


<script setup lang="ts">
import IconBase from '../examples/icon/base.vue'
import IconSlot from '../examples/icon/slot.vue'
</script>
