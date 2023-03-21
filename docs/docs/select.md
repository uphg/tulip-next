# Select 选择器

下拉选择

## 基本用法

选择器基本用法

::: demo

select/base

:::

## 多选

可以选择多个

::: demo

select/multiple

:::

## 可清空

::: demo

select/clearable

:::

## 尺寸

::: demo

select/size

:::

## Select 属性

| 名称           | 说明                              | 类型                     | 默认值       |
| -------------- | --------------------------------- | ------------------------ | ------------ |
| value          | 选中的值                          | `string \| number`       | `undefined`  |
| options        | 下拉选项列表                      | `Array<strin \| number>` | `[]`         |
| value-field    | `SelectOption` 的 value 字段名    | `string`                 | `'value'`    |
| label-field    | `SelectOption` 的 label 字段名    | `string`                 | `'label'`    |
| disabled-field | `SelectOption` 的 disabled 字段名 | `string`                 | `'disabled'` |
| clearable      | 是否可清空                        | `boolean`                | `false`      |
| disabled       | 是否禁用                          | `boolean`                | `false`      |
| multiple       | 是否可多选                        | `boolean`                | `false`      |


<script setup lang="ts">
import SelectBase from '../examples/select/base.vue'
import SelectClearable from '../examples/select/clearable.vue'
import SelectMultiple from '../examples/select/multiple.vue'
import SelectSize from '../examples/select/size.vue'
</script>
