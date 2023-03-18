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

支持加载状态

::: demo

input/loading

:::

## 密码

使用 `visibility-toggle` 配置密码显示的切换方式

::: demo

input/password

:::

## 禁用

输入框可以禁用

::: demo

input/disabled

:::

## 可清空

清空输入的值，在有值时

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



## Input 属性



| 名称              | 说明                 | 类型                                 | 默认值      |
| ----------------- | -------------------- | ------------------------------------ | ----------- |
| value             | 文本输入的值         | `string \| null`                     | `null`      |
| type              | 输入框类型           | `'text' \| 'password' \| 'textarea'` | `'text'`    |
| status            | 验证状态             | `'success' \| 'warning' \| 'error'`  | `undefined` |
| size              | 输入框尺寸           | `'large' \| 'medium' \| 'small'`     | `'medium'`  |
| placeholder       | 输入框的占位符       | `string`                             | `undefined` |
| visibility-toggle | 显示密码按钮切换方式 | `'click' \| 'mousedown'`             | `undefined` |
| disabled          | 是否禁用             | `boolean`                            | `false`     |
| loading           | 加载状态             | `boolean`                            | `false`     |
| clearable         | 是否可清空           | `boolean`                            | `false`     |

## Input 插槽

| 名称   | 说明           | 参数 |
| ------ | -------------- | ---- |
| prefix | Input 前缀内容 | `()` |
| suffix | Input 后缀内容 | `()` |



<script setup lang="ts">
import InputBase from '../examples/input/base.vue'
import InputPrefixAndSuffix from '../examples/input/prefix-and-suffix.vue'
import InputGroup from '../examples/input/group.vue'
import InputDisabled from '../examples/input/disabled.vue'
import InputLoading from '../examples/input/loading.vue'
import InputPassword from '../examples/input/password.vue'
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