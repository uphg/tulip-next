# Tabs 标签页

用于切换开关状态的组件。

## 基础用法

一个可切换的标签页。

::: demo

tabs/base

:::

## 前缀/后缀

可以添加前缀后缀

::: demo

tabs/prefix-suffix

:::

## 分段标签

分段式的标签

::: demo

tabs/segment

:::

## Tabs 属性

| 名称  | 说明               | 类型                     | 默认值      |
| ----- | ------------------ | ------------------------ | ----------- |
| value | 激活标签的 name 值 | `string \| number`       | `undefined` |
| type  | Tabs 外观类型      | `'default' \| 'segment'` | `'default'` |



## Tabs 插槽

| 名称   | 说明     | 参数 |
| ------ | -------- | ---- |
| prefix | 标签前缀 | `()` |
| suffix | 标签后缀 | `()` |



## TabPane 属性

| 名称  | 说明                 | 类型               | 默认值      |
| ----- | -------------------- | ------------------ | ----------- |
| name  | 绑定 name 值（必填） | `string \| number` | `undefined` |
| label | 标签名称             | `string \| number` | `undefined` |



<script setup lang="ts">
import TabsBase from '../examples/tabs/base.vue'
import TabsPrefixSuffix from '../examples/tabs/prefix-suffix.vue'
import TabsSegment from '../examples/tabs/segment.vue'
</script>
