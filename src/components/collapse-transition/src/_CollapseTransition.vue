<template>
  <transition v-on="on">
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TCollapseTransition'
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { addClass, removeClass, getStyle } from '../../../utils'

const TRANSITION_CLASS = 'tu-collapse-transition--active'
const enterStatus = ref(false)
const leaveStatus = ref(false)

const on = {
  // 进入动画 --- 执行前
  beforeEnter(el: HTMLElement) {
    console.log('执行前')
    enterStatus.value = true
    addClass(el, TRANSITION_CLASS)

    // 如果离开动画没有做完，禁止存储当前 margin 值
    if (!leaveStatus.value) {
      el.dataset.oldMarginTop = getStyle(el, 'marginTop')
      el.dataset.oldMarginBottom = getStyle(el, 'marginBottom')
    }

    // el.style.height = '0'
    el.style.marginTop = '0'
    el.style.marginBottom = '0'
  },

  // 进入动画 --- 执行中
  enter(el: HTMLElement) {
    console.log('执行中')
    el.dataset.oldOverflow = el.style.overflow
    void el.scrollHeight
    // const height = el.scrollHeight
    el.style.height = `${el.scrollHeight}px`
    el.style.marginTop = el.dataset.oldMarginTop as string
    el.style.marginBottom = el.dataset.oldMarginBottom as string
    el.style.overflow = 'hidden'
  },

  // 进入动画 --- 执行后
  afterEnter(el: HTMLElement) {
    console.log(123)
    enterStatus.value = false
    removeClass(el, TRANSITION_CLASS)
    el.style.height = ''
    el.style.overflow = String(el.dataset.oldOverflow)
  },

  // 离开动画 --- 执行前
  beforeLeave(el: HTMLElement) {
    leaveStatus.value = true
    // 如果进入动画没有做完，禁止存储当前 margin 值
    if (!enterStatus.value) {
      el.dataset.oldMarginTop = getStyle(el, 'marginTop')
      el.dataset.oldMarginBottom = getStyle(el, 'marginBottom')
    }

    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  // 离开动画 --- 执行中
  leave(el: HTMLElement) {
    void el.scrollHeight
    addClass(el, TRANSITION_CLASS)
    el.style.height = '0'
    el.style.marginTop = '0'
    el.style.marginBottom = '0'
  },

  // 离开动画 --- 执行后
  afterLeave(el: HTMLElement) {
    leaveStatus.value = false
    removeClass(el, TRANSITION_CLASS)
    el.style.overflow = String(el.dataset.oldOverflow)
    el.style.height = ''
    el.style.marginTop = el.dataset.oldMarginTop as string
    el.style.marginBottom = el.dataset.oldMarginBottom as string
  }
}
</script>
<!-- 
<style lang="stylus">
@require '../../_styles/components/collapse-transition'
</style> -->
