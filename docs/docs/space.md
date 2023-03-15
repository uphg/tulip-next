# Space 间距

快捷添加组件间距

## 基础用法

::: demo

space/base

:::

## 垂直

::: demo

space/vertical

:::

## 尾部对齐

::: demo

space/end

:::

## 间隔

::: demo

space/between

:::

## 环绕

::: demo

space/around

:::

## 居中

::: demo

space/center

:::

## 垂直布局

::: demo

space/align

:::

## Space 属性

| 名称       | 说明                     | 类型                                                         | 默认值      |
| ---------- | ------------------------ | ------------------------------------------------------------ | ----------- |
| inline     | 是否为行内元素           | `boolean`                                                    | `false`     |
| vertical   | 是否垂直布局             | `boolean`                                                    | `false`     |
| wrap       | 是否超出换行             | `boolean`                                                    | `true`      |
| justify    | 水平排列方式             | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'`   |
| align      | 垂直排列方式             | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'`    | `'start'`   |
| size       | 间隙尺寸                 | `'small' \|'medium' \|'large' \|number \|[number, number]`   | `[8, 12]`   |
| wrap-item  | 是否存在包裹子元素的 div | `boolean`                                                    | `true`      |
| item-style | 子元素样式               | `string \| Record<string, string>`                           | `undefined` |
| item-class | 子元素 class             | `string \| Record<string, string>`                           | `undefined` |



<script setup lang="ts">
import SpaceBase from '../examples/space/base.vue'
import SpaceVertical from '../examples/space/vertical.vue'
import SpaceEnd from '../examples/space/end.vue'
import SpaceBetween from '../examples/space/between.vue'
import SpaceAround from '../examples/space/around.vue'
import SpaceCenter from '../examples/space/center.vue'
import SpaceAlign from '../examples/space/align.vue'
</script>
