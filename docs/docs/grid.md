# Grid 栅格

## 基本用法

::: demo

grid/base

:::

## 区块间隔

::: demo

grid/gutter

:::

## 偏移

::: demo

grid/offset

:::

## 相对移动

::: demo

grid/relative

:::

## 对齐方式

使用 `justify` 可以自定义 flex 对齐方式

::: demo

grid/justify

:::

## 垂直对齐

用 `align` 定义垂直对齐方式

::: demo

grid/align

:::

## Col 属性

| 名称   | 说明               | 类型               | 默认值      |
| ------ | ------------------ | ------------------ | ----------- |
| span   | 栅格占位格数       | `number \| string` | `undefined` |
| offset | 栅格左侧的间隔格数 | `number \| string` | `undefined` |
| push   | 栅格向右移动格数   | `number \| string` | `undefined` |
| pull   | 栅格向左移动格数   | `number \| string` | `undefined` |

## Row 属性

| 名称    | 说明           | 类型                                                         | 默认值      |
| ------- | -------------- | ------------------------------------------------------------ | ----------- |
| gutter  | 栅格间隙       | `number \|[number, number]`                                  | `undefined` |
| justify | 水平排列方式   | `'start' \|'end' \|'center' \|'space-around' \|'space-between' \|'space-evenly'` \|`'start'` | `'start'`   |
| align   | 垂直排列方式   | `'start' \|'end' \|'center' \|'baseline' \|'stretch'`        | `'start'`   |
| nowrap  | 是否不自动换行 | `boolean`                                                    | `false`     |




<script setup lang="ts">
import GridBase from '../examples/grid/base.vue'
import GridGutter from '../examples/grid/gutter.vue'
import GridOffset from '../examples/grid/offset.vue'
import GridRelative from '../examples/grid/relative.vue'
import GridJustify from '../examples/grid/justify.vue'
import GridAlign from '../examples/grid/align.vue'
</script>
