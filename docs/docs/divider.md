# 分割线

分割内容

## 基本用法

::: demo

divider/base

:::

## 样式

可以调整颜色样式

::: demo

divider/style

:::

## 标题

添加标题，支持插槽添加

::: demo

divider/title

:::

## 垂直

竖向分割线

::: demo

divider/vertical

:::

## Divider 属性

| 名称            | 描述         | 类型                            | 默认值      |
| --------------- | ------------ | ------------------------------- | ----------- |
| title           | 标题         | `string`                        | `undefined` |
| title-placement | 标题位置     | `'left' \| 'right' \| 'center'` | `'content'` |
| vertical        | 是否垂直分割 | `boolean`                       | `false`     |
| dashed          | 是否使用虚线 | `boolean`                       | `false`     |
| color           | 分割线颜色   | `string`                        | `undefined` |



<script setup lang="ts">
import DividerBase from '../examples/divider/base.vue'
import DividerStyle from '../examples/divider/style.vue'
import DividerTitle from '../examples/divider/title.vue'
import DividerVertical from '../examples/divider/vertical.vue'
</script>
