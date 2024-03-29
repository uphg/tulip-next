# Scrollbar 滚动条

更好看的滚动条 

## 基本用法

使用滚动条需要固定高度

::: demo

scrollbar/base

:::

## 横向滚动条

超出宽度会显示横向滚动条

::: demo

scrollbar/horizontal

:::

## 触发方式

使用 `trigger="none"` 让滚动条一直显示

::: demo

scrollbar/trigger

:::

## 尺寸

滚动条有两种尺寸

::: demo

scrollbar/size

:::



## Scrollbar 属性

| 名称     | 说明                     | 类型                  | 默认值      |
| -------- | ------------------------ | --------------------- | ----------- |
| trigger  | scrollbar 显示的触发方式 | `'hover' \| 'none'`   | `'hover'`   |
| size     | scrollbar 尺寸           | `'medium' \| 'large'` | `'medium'`  |
| onScroll | 滚动监听事件             | `(e: Event) => void`  | `undefined` |

## Scrollbar 方法

| 名称     | 说明                | 参数                          |
| -------- | ------------------- | ----------------------------- |
| update   | 更新 scrollbar 状态 | `()`                          |
| scrollTo | 滚动内容            | `(options?: ScrollToOptions)` |
| scrollBy | 滚动特定距离        | `(options?: ScrollToOptions)` |



<script setup lang="ts">
import ScrollbarBase from '../examples/scrollbar/base.vue'
import ScrollbarHorizontal from '../examples/scrollbar/horizontal.vue'
import ScrollbarTrigger from '../examples/scrollbar/trigger.vue'
import ScrollbarSize from '../examples/scrollbar/size.vue'
</script>