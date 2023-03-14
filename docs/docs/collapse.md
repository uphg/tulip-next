# Collapse 折叠面板

## 基本用法

可以展开多个面板

::: demo

collapse/base

:::

## 手风琴

使用手风琴模式只展开单个

::: demo

collapse/accordion

:::

## Collapse 属性

| 名称         | 说明                                            | 类型                                                  | 默认值      |
| ------------ | ----------------------------------------------- | ----------------------------------------------------- | ----------- |
| active-names | 展开的面板的 `name`，`accordion` 模式时不为数组 | `string \| number \| Array<string \| number> \| null` | `undefined` |
| accordion    | 是否为手风琴模式                                | `boolean`                                             | `false`     |

## CollapseItem 属性

| 名称  | 说明 | 类型               | 默认值      |
| ----- | ---- | ------------------ | ----------- |
| title | 标题 | `string \| number` | `undefined` |
| name  | 名称 | `string \| number` | `undefined` |



## Collapse 事件

| 名称                | 说明              | 回调参数                                              |
| ------------------- | ----------------- | ----------------------------------------------------- |
| update:active-names | name 值改变时触发 | `string \| number \| Array<string \| number> \| null` |



<script setup lang="ts">
import CollapseBase from '../examples/collapse/base.vue'
import CollapseAccordion from '../examples/collapse/accordion.vue'
</script>
