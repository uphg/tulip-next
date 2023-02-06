# Popover 弹出信息

弹出一些信息。

## 基础用法

::: demo

popover/base

:::

## 触发方式

::: demo

popover/trigger

:::

## 不要箭头

::: demo

popover/hide-arrow

:::

## 位置

有十二个不同的弹出方向

::: demo

popover/placement

:::

## 自定义样式

可以使用 `tu-popup` 组件封装一个自定义 Popover，所有 Popover 组件都是基于该组件

::: demo

popover/raw

:::

<script setup lang="ts">
import PopoverBase from '../examples/popover/base.vue'
import PopoverTrigger from '../examples/popover/trigger.vue'
import PopoverHideArrow from '../examples/popover/hide-arrow.vue'
import PopoverPlacement from '../examples/popover/placement.vue'
import PopoverRaw from '../examples/popover/raw.vue'
</script>
