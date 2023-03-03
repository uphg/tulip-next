# Radio 单选

单选框

## 基本用法

用 checked 判断是否选中

::: demo

radio/base

:::

## 选项组

::: demo

radio/group

:::

## 按钮组

::: demo

radio/button-group

:::

## 大小

::: demo

radio/size

:::

## 按钮组大小

::: demo

radio/button-size

:::

## Radio 属性

| 名称     | 说明         | 类型                             | 默认值      |
| -------- | ------------ | -------------------------------- | ----------- |
| value    | 绑定值       | `string \| number \| boolean`    | `undefined` |
| checked  | 是否选中     | `boolean`                        | `undefined` |
| label    | 标签内容     | `string`                         | `undefined` |
| disabled | 是否禁用     | `boolean`                        | `false`     |
| size     | Radio 的大小 | `'small' \| 'medium' \| 'large'` | `'medium'`  |



<script setup lang="ts">
import RadioBase from '../examples/radio/base.vue'
import RadioGroup from '../examples/radio/group.vue'
import RadioButtonGroup from '../examples/radio/button-group.vue'
import RadioSize from '../examples/radio/size.vue'
import RadioButtonSize from '../examples/radio/button-size.vue'
</script>
