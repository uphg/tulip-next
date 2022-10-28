# Switch 组件

用于切换开关状态的组件。

## 基础用法

绑定 value 来切换 Switch 的状态。

::: demo

switch/base

:::

## 添加内容

可以使用命名插槽添加内容描述。

::: demo

switch/text

:::

## 大小

有三种大小。

::: demo

switch/size

:::

## 可自定义值

可以自定义开关的值。

::: demo

switch/custom-value

:::

## 形状

可以设置为方形。

::: demo

switch/shape

:::

## 属性

| 名称           | 说明           | 类型                                  | 默认值  |
| -------------- | -------------- | ------------------------------------- | ------- |
| value          | 开关的状态     | `string \| number \| boolean`         | `false` |
| size           | 开关的大小     | `'' \| large' \| 'medium' \| 'small'` | `''`    |
| checkedValue   | 开启时的默认值 | `string \| number \| boolean`         | `false` |
| uncheckedValue | 关闭时的默认值 | `string \| number \| boolean`         | `false` |
| square         | 是否为方形     | `boolean`                             | `false` |


<script setup lang="ts">
import SwitchBase from '../examples/switch/base.vue'
import SwitchText from '../examples/switch/text.vue'
import SwitchSize from '../examples/switch/size.vue'
import SwitchCustomValue from '../examples/switch/custom-value.vue'
import SwitchShape from '../examples/switch/shape.vue'
</script>

<style lang="stylus">
.demo-switch > .component {
  display: flex;
  align-items: flex-end;
  .tu-switch {
    margin-right: 1em;
  }
}
</style>
