# Transition 过渡

内置了几种常用的过渡 CSS

## 缩放

附带渐变的缩放

::: demo

transition/zoom

:::

## 滑动

使用 `mode="out-in"` 添加交错过渡的滑动渐变

::: demo

transition/slide

:::

## 淡出/淡入

只有淡出/淡入的过渡

::: demo

transition/fade

:::

<script setup lang="ts">
import TransitionFade from '../examples/transition/fade.vue'
import TransitionZoom from '../examples/transition/zoom.vue'
import TransitionSlide from '../examples/transition/slide.vue'
</script>

<style>
.demo-transition.transition__slide .tu-button {
  margin-right: 12px;
}
</style>