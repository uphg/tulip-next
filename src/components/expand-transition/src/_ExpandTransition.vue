<template>
  <transition v-on="on">
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { addClass, removeClass } from '../../../utils'

const TRANSITION_CLASS = 'tu-expand-transition--active'
const on = {
  // 进入动画 --- 执行前
  beforeEnter(el: HTMLElement) {
    addClass(el, TRANSITION_CLASS)

    el.style.width = '0'
    el.style.marginLeft = '0'
    el.style.marginRight = '0'
  },

  // 进入动画 --- 执行中
  enter(el: HTMLElement) {
    el.dataset.oldOverflow = el.style.overflow

    void el.scrollWidth
    el.style.width = ''
    el.style.marginLeft = ''
    el.style.marginRight = ''
    el.style.overflow = 'hidden'
  },

  // 进入动画 --- 执行后
  afterEnter(el: HTMLElement) {
    removeClass(el, TRANSITION_CLASS)
    el.style.width = ''
    el.style.overflow = String(el.dataset.oldOverflow)
  },

  // 离开动画 --- 执行前
  beforeLeave(el: HTMLElement) {
    el.style.width = `${el.offsetWidth}px`
    el.style.overflow = 'hidden'
  },

  // 离开动画 --- 执行中
  leave(el: HTMLElement) {
    void el.scrollWidth
    addClass(el, TRANSITION_CLASS)
    el.style.width = '0'
    el.style.marginLeft = '0'
    el.style.marginRight = '0'
  },

  // 离开动画 --- 执行后
  afterLeave(el: HTMLElement) {
    removeClass(el, TRANSITION_CLASS)
    el.style.overflow = String(el.dataset.oldOverflow)
    el.style.width = ''
    el.style.marginLeft = ''
    el.style.marginRight = ''
  }
}
</script>