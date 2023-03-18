# Cascader 级联选择

多层级选择器

## 基本用法

绑定一个数组

::: demo

cascader/base

:::

## 可清空

::: demo

cascader/clearable

:::

## 尺寸

::: demo

cascader/size

:::

## Cascader 属性

| 名称          | 说明                                | 类型                             | 默认值       |
| ------------- | ----------------------------------- | -------------------------------- | ------------ |
| value         | 选中的值                            | `Array<number \|string> \| null` | `null`       |
| options       | 选择列表                            | `CascaderOption[]`               | `[]`         |
| valueField    | `CascaderOption` 的 value 字段名    | `string`                         | `'value'`    |
| labelField    | `CascaderOption` 的 label 字段名    | `string`                         | `'label'`    |
| childrenField | `CascaderOption` 的 children 字段名 | `string`                         | `'children'` |
| disabledField | `CascaderOption` 的 disabled 字段名 | `string`                         | `'disabled'` |
| placeholder   | 提示内容                            | `string`                         | `undefined`  |
| clearable     | 是否可清空                          | `boolean`                        | `false`      |


<script setup lang="ts">
import CascaderBase from '../examples/cascader/base.vue'
import CascaderClearable from '../examples/cascader/clearable.vue'
import CascaderSize from '../examples/cascader/size.vue'
</script>
