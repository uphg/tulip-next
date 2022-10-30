# Transition 过渡

Tulp 内置了几种常用的过渡动画

## 展开/折叠

使用 `tu-collapse-transition` 组件实现展开/折叠效果

::: demo

transition/collapse

:::

## 缩放

附带渐变的缩放

::: demo

transition/zoom-fade

:::

## 滑动

支持交错过渡的滑动渐变

::: demo

transition/slide-fade

:::

## 淡出/淡入

使用 `tu-fade` 添加淡出/淡入过渡

::: demo

transition/fade

:::

<script setup lang="ts">
import TransitionFade from '../examples/transition/fade.vue'
import TransitionZoomFade from '../examples/transition/zoom-fade.vue'
import TransitionSlideFade from '../examples/transition/slide-fade.vue'
import TransitionCollapse from '../examples/transition/collapse.vue'
</script>