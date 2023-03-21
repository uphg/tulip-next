# Modal 模态框

模态对话框。

## 基本用法

弹出一个框框

::: demo

modal/base

:::

## 弹框样式

也可以搭配 dialog 使用

::: demo

modal/dialog

:::

## Modal 属性

| 名称             | 说明                                     | 类型            | 默认值      |
| ---------------- | ---------------------------------------- | --------------- | ----------- |
| visible          | 是否显示 Modal                           | `boolean`       | `false`     |
| on-after-enter   | 打开动画结束后执行                       | `() => void`    | `undefined` |
| on-after-leave   | 关闭动画结束后执行                       | `() => void`    | `undefined` |
| disabled         | 是否禁用弹框开关                         | `boolean`       | `false`     |
| mask-closable    | 点击遮罩时是否发出 `update:visible` 事件 | `boolean`       | `true`      |
| render-directive | Modal 渲染指令                           | `'if' | 'show'` | `'if'`      |
| disable-scroll   | Modal 打开时是否禁用 body 滚动           | `boolean`       | `true`      |



<script setup lang="ts">
import ModalBase from '../examples/modal/base.vue'
import ModalDialog from '../examples/modal/dialog.vue'
</script>