# Ellipsis 文本省略

自动省略多余文本

## 基础用法

::: demo

ellipsis/base

:::

## 多行

::: demo

ellipsis/line-clamp

:::



## Ellipsis 属性

| 名称          | 说明                    | 类型               | 默认值      |
| ------------- | ----------------------- | ------------------ | ----------- |
| lineClamp     | 最大行数                | `string \| number` | `undefined` |
| expandTrigger | 展开/收起文字的触发方式 | `'click'`          | `undefined` |
| tooltip       | 是否显示 tooltip        | `boolean`          | `true`      |

## Ellipsis 插槽

| 名称    | 说明             | 参数 |
| ------- | ---------------- | ---- |
| tooltip | tooltip 弹框内容 | `()` |




<script setup lang="ts">
import EllipsisBase from '../examples/ellipsis/base.vue'
import EllipsisLineClamp from '../examples/ellipsis/line-clamp.vue'
</script>
