# Ellipsis 文本省略

自动省略多余文本

## 基础用法

带有 Tooltip 的基本的单行省略

::: demo

ellipsis/base

:::

## 最大行数

添加 `line-clamp` 设置展开行数（基于 `-webkit-line-clamp`，兼容性见 [caniuse](https://caniuse.com/?search=line-clamp)）

::: demo

ellipsis/line-clamp

:::

## 展开方式

使用 `expand-trigger="click"` 开启点击展开/折叠省略内容

::: demo

ellipsis/expand-trigger

:::

## Ellipsis 属性

| 名称           | 说明                    | 类型               | 默认值      |
| -------------- | ----------------------- | ------------------ | ----------- |
| line-clamp     | 最大行数                | `string \| number` | `undefined` |
| expand-trigger | 展开/收起文字的触发方式 | `'click'`          | `undefined` |
| tooltip        | 是否显示 tooltip        | `boolean`          | `true`      |

## Ellipsis 插槽

| 名称    | 说明             | 参数 |
| ------- | ---------------- | ---- |
| tooltip | tooltip 弹框内容 | `()` |




<script setup lang="ts">
import EllipsisBase from '../examples/ellipsis/base.vue'
import EllipsisLineClamp from '../examples/ellipsis/line-clamp.vue'
import EllipsisExpandTrigger from '../examples/ellipsis/expand-trigger.vue'
</script>
