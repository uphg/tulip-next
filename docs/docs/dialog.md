# Dialog 弹框

Dialog 弹出对话框组件

## 基本用法

::: demo

dialog/base

:::

## 自定义模板

可以添加自定义模板

::: demo

dialog/custom

:::

## 快捷打开

可以用函数调用的方式快捷打开

::: demo

dialog/quick

:::

## 属性

| 名称            | 说明                                         | 类型                    | 默认值      |
| --------------- | -------------------------------------------- | ----------------------- | ----------- |
| renderDirective | 渲染指令                                     | `'if' \| 'show'`        | `'if'`      |
| visible         | 是否显示 Dialog                              | `boolean`               | `false`     |
| maskClosable    | 是否可点击遮罩关闭弹框                       | `boolean`               | `true`      |
| title           | 弹框的标题（只在默认布局下生效）             | `string`                | `undefined` |
| wrap            | 弹框是否被父元素包裹，默认插入至 body 元素上 | `boolean`               | `false`     |
| custom          | 预设模板                                     | `'default' \| 'custom'` | `'default'` |

## 事件

| 名称           | 说明                    | 回调参数    |
| -------------- | ----------------------- | ----------- |
| open           | 打开弹框时执行          | `undefined` |
| opened         | 打开弹框动画结束时执行  | `undefined` |
| close          | 关闭弹框时执行          | `undefined` |
| closed         | 关闭弹框动画结束时执行  | `undefined` |
| maskClick      | 点击遮罩时触发          | `Event`     |
| update:visible | 更新 visible 状态时触发 | `boolean`   |


<script setup lang="ts">
import DialogBase from '../examples/dialog/base.vue'
import DialogCustom from '../examples/dialog/custom.vue'
import DialogQuick from '../examples/dialog/quick.vue'
</script>

<style lang="stylus">

.dialog__quick .component .tu-button
    margin-right 10px

</style>
