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