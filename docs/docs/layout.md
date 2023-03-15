# Layout 布局

布局组件

## 基础用法

一个基本的三段式布局

::: demo

layout/base

:::

## 滚动

内容滚动，上下固定

::: demo

layout/scroll

:::

## 侧栏折叠

侧栏展开/折叠

::: demo

layout/collapsed

:::

## Layout 公共属性

| 名称      | 说明             | 类型               | 默认值      |
| --------- | ---------------- | ------------------ | ----------- |
| width     | 宽度 | `string \| number` | `undefined` |
| height    | 高度             | `string \| number` | `undefined` |
| wrap | 内容是否自动换行 | `boolean` | `undefined` |
| grow | 内容的放大比例 | `string \| number` | `undefined` |
| direction | 内容的布局方向（layout 默认 `column`） | `'row' \| 'column'` | `undefined` |

## Layout 属性

见 [Layout 公共属性](./layout#Layout-公共属性)

## Header 属性

见 [Layout 公共属性](./layout#Layout-公共属性)

## Content 属性

见 [Layout 公共属性](./layout#Layout-公共属性)

## Footer 属性

见 [Layout 公共属性](./layout#Layout-公共属性)

## Sidebar 属性

| 名称            | 说明         | 类型               | 默认值  |
| --------------- | ------------ | ------------------ | ------- |
| collapsed       | 是否折叠     | `boolean`          | `false` |
| collapsed-width | 折叠后的宽度 | `string \| number` | `64`    |

其他属性见 [Layout 公共属性](./layout#Layout-公共属性)


<script setup lang="ts">
import { FlexWrap } from './_common'
import LayoutBase from '../examples/layout/base.vue'
import LayoutScroll from '../examples/layout/scroll.vue'
import LayoutCollapsed from '../examples/layout/collapsed.vue'
</script>