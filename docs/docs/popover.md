# Popover 弹出信息

弹出一些信息。

## 基础用法

::: demo

popover/base

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

## Popover 属性

| 名称          | 说明                       | 类型                                                         | 默认值      |
| ------------- | -------------------------- | ------------------------------------------------------------ | ----------- |
| trigger       | 触发方式                   | `'hover' \| 'click' \| 'focus' \| 'manual'`                     | `'hover'`   |
| visible       | 是否显示 Popover           | `boolean`                                                    | `false`     |
| placement     | Popover 的弹出位置         | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'top'`     |
| content       | 展示的内容                 | `string`                                                     | `undefined` |
| popoverMargin | Popover 与触发元素的距离   | `string \| number `        |`8`|
| arrowMargin   | 箭头一侧对齐时与一侧的距离 | `string \| number`                                           | `10`        |
| hideArrow | 是否隐藏箭头 | `boolean` | `false` |
| disabled | 是否禁用 Popover 弹出 | `boolean` | `false` |

## Popover 插槽

| 名称    | 说明                                  | 参数          |
| ------- | ------------------------------------- | ------------- |
| default | Poopver 内容插槽，附带 close 关闭函数 | `({ close })` |
| trigger | 触发元素插槽                          | `()`          |



<script setup lang="ts">
import PopoverBase from '../examples/popover/base.vue'
import PopoverHideArrow from '../examples/popover/hide-arrow.vue'
import PopoverPlacement from '../examples/popover/placement.vue'
import PopoverRaw from '../examples/popover/raw.vue'
</script>
