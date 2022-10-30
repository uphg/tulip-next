# Button 按钮

平平无奇的按钮。

## 基本用法

使用 type 改变它的默认主题色

::: demo

button/base

:::

<div class="tu-collapse-transition--active"></div>


## 大小

按钮有三种大小。

::: demo

button/size

:::

## 虚线按钮

使用 `dashed` 设置虚线按钮。

::: demo

button/dashed

:::

## 添加图标

添加图标来增加按钮的辨识度。

::: demo

button/icon

:::

## 文本按钮

按钮可以是文本。

::: demo

button/text

:::

## 形状

按钮有多种形状。

::: demo

button/shape

:::

## 透明背景

带有 `ghost` 属性的透明背景按钮。

::: demo

button/ghost

:::

## 加载状态

按钮有 loading 状态。

::: demo

button/loading

:::

## 按钮组

可以添加按钮组，使用 `vertical` 属性可以使按钮组竖向排列。

::: demo

button/group

:::

## Button 属性

| 名称         | 说明               | 类型                                                         | 默认值      |
| ------------ | ------------------ | ------------------------------------------------------------ | ----------- |
| size         | 按钮的大小         | `'large' \| 'medium' \| 'small'`                             | `'medium'`  |
| dashed       | 虚线按钮           | `boolean`                                                    | `false`     |
| ghost        | 按钮是否为透明背景 | `boolean`                                                    | `false`     |
| icon         | 给按钮添加图标     | `string`                                                     | `undefined` |
| iconPosition | 设置按钮图标的位置 | `'left' \| 'right' `                                         | `'left'`    |
| type         | 按钮的类型         | `'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'error'` | `'default'` |
| nativeType   | 原生 type 属性     | `'button' \| 'submit' \| 'reset'`                            | `'button'`  |
| loading      | 按钮 loading 状态  | `boolean`                                                    | `false`     |
| disabled     | 按钮禁用状态       | `boolean`                                                    | `false`     |
| text         | 显示文本按钮       | `boolean`                                                    | `false`     |
| round        | 显示圆角按钮       | `boolean`                                                    | `false`     |
| circle       | 显示圆形按钮       | `boolean`                                                    | `false`     |

## Button Group 属性

| 名称     | 说明               | 类型      | 默认值  |
| -------- | ------------------ | --------- | ------- |
| vertical | 是否竖直排列按钮组 | `boolean` | `false` |

## Button Group 插槽

| 名称    | 参数        | 说明                   |
| ------- | ----------- | ---------------------- |
| default | button 按钮 | 用于添加按钮组中的按钮 |


<script setup lang="ts">
import ButtonBase from '../examples/button/base.vue'
import ButtonSize from '../examples/button/size.vue'
import ButtonDashed from '../examples/button/dashed.vue'
import ButtonIcon from '../examples/button/icon.vue'
import ButtonText from '../examples/button/text.vue'
import ButtonShape from '../examples/button/shape.vue'
import ButtonGhost from '../examples/button/ghost.vue'
import ButtonLoading from '../examples/button/loading.vue'
import ButtonGroup from '../examples/button/group.vue'
</script>

<style lang="stylus">
.demo-button

  & > .component
    display flex
    align-items flex-end
    flex-wrap wrap

    .tu-button
      margin-right 10px

    .tu-button-group
      margin-right 20px

      .tu-button
        margin-right 0

</style>