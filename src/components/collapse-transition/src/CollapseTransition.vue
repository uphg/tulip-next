<template>
  <transition v-on="on">
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { addClass, removeClass, setStyle } from '../../../utils'
const TRANSITION_CLASS = 'tu-collapse-transition--active'

const on = {
  // 进入动画 --- 执行前
  beforeEnter(el: HTMLElement) {
    console.log('进入动画 --- 执行前')
    addClass(el, TRANSITION_CLASS)
    setStyle(el, { height: '0', overflow: 'hidden' })
  },

  // 进入动画 --- 执行中
  enter(el: HTMLElement) {
    console.log('进入动画 --- 执行中')
    nextFrame(el)
    setStyle(el, { height: `${el.scrollHeight}px` })
  },

  // 进入动画 --- 执行后
  afterEnter(el: HTMLElement) {
    removeClass(el, TRANSITION_CLASS)
    setStyle(el, { height: '', overflow: '' })
  },

  // 离开动画 --- 执行前
  beforeLeave(el: HTMLElement) {
    setStyle(el, {
      height: `${el.scrollHeight}px`,
      overflow: 'hidden'
    })
  },

  // 离开动画 --- 执行中
  leave(el: HTMLElement) {
    nextFrame(el)
    addClass(el, TRANSITION_CLASS)
    setStyle(el, { height: '0' })
  },

  // 离开动画 --- 执行后
  afterLeave(el: HTMLElement) {
    removeClass(el, TRANSITION_CLASS)
    const overflow = el.getAttribute('oldOverflow') || ''
    setStyle(el, { overflow, height: '' })
  }
}

function nextFrame(el: Element) {
  return void el.scrollHeight
}
</script>