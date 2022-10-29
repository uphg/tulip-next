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

## 输入组

输入框可以组合

::: demo

input/group

:::

<script setup lang="ts">
import InputBase from '../examples/input/base.vue'
import InputPrefixAndSuffix from '../examples/input/prefix-and-suffix.vue'
import InputGroup from '../examples/input/group.vue'
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