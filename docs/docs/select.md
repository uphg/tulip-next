# Select 选择器

下拉选择

## 基本用法

::: demo

select/base

:::

## Select 属性

| 名称      | 说明         | 类型                     | 默认值      |
| --------- | ------------ | ------------------------ | ----------- |
| value     | 选中的值     | `string \| number`       | `undefined` |
| options   | 下拉选项列表 | `Array<strin \| number>` | `[]`        |
| clearable | 是否可清空   | `boolean`                | `false`     |



<script setup lang="ts">
import SelectBase from '../examples/select/base.vue'
</script>
