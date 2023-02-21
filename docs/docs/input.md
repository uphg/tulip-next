# Input 输入框

一个朴实无华的输入框。

## 基础用法

文本输入框

::: demo

input/base

:::

## 前缀 & 后缀

通过插槽添加前缀后缀

::: demo

input/prefix-and-suffix

:::

## 加载状态

::: demo

input/loading

:::

## 禁用状态

::: demo

input/disabled

:::

## 可清空

::: demo

input/clearable

:::

## 输入组

输入框可以组合

::: demo

input/group

:::

## 尺寸

::: demo

input/size

:::

<script setup lang="ts">
import InputBase from '../examples/input/base.vue'
import InputPrefixAndSuffix from '../examples/input/prefix-and-suffix.vue'
import InputGroup from '../examples/input/group.vue'
import InputDisabled from '../examples/input/disabled.vue'
import InputLoading from '../examples/input/loading.vue'
import InputClearable from '../examples/input/clearable.vue'
import InputSize from '../examples/input/size.vue'
</script>

<style lang="stylus">
.space {
  max-width: 300px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 10px;
}

.demo-input {
  .tu-input {
    width: 240px;
  }
}

.input__group {
  .tu-input-group {
    width: 320px;
  }
}
</style>