# Checkbox 多选框

多选框框

## 基本用法

用 checked 判断是否选中

::: demo

checkbox/base

:::

## 选项组

用 checked 判断是否选中

::: demo

checkbox/group

:::

## 部分选中

用 checked 判断是否选中

::: demo

checkbox/indeterminate

:::


## 尺寸

::: demo

checkbox/size

:::

## Checkbox 属性

| 名称          | 说明         | 类型                             | 默认值      |
| ------------- | ------------ | -------------------------------- | ----------- |
| checked       | 是否选中     | `boolean`                        | `false`     |
| value         | 绑定值       | `string \| number \| boolean`    | `undefined` |
| label         | 标签内容     | `string`                         | `undefined` |
| indeterminate | 是否部分选中 | `boolean`                        | `false`     |
| disabled      | 是否禁用     | `boolean`                        | `false`     |
| size          | Radio 的大小 | `'small' \| 'medium' \| 'large'` | `'medium'`  |

## CheckboxGroup 属性

| 名称  | 说明                | 类型                             | 默认值      |
| ----- | ------------------- | -------------------------------- | ----------- |
| value | 当前选中 Radio 的值 | `string \| number \| boolean`    | `undefined` |
| size  | Radio 的大小        | `'small' \| 'medium' \| 'large'` | `'medium'`  |

## Checkbox 方法

| 名称  | 说明 | 类型         |
| ----- | ---- | ------------ |
| focus | 聚焦 | `() => void` |
| blur  | 失焦 | `() => void` |


<script setup lang="ts">
import CheckboxBase from '../examples/checkbox/base.vue'
import CheckboxSize from '../examples/checkbox/size.vue'
import CheckboxGroup from '../examples/checkbox/group.vue'
import CheckboxIndeterminate from '../examples/checkbox/indeterminate.vue'
</script>
