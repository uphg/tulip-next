<template>
  <div ref="scrollbar" class="tulp-scrollbar">
    <div
      ref="wrap"
      :class="[
        wrapClass,
        'tulp-scrollbar__wrap'
      ]"
      :style="style"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        :class="['tulp-scrollbar__view', viewClass]"
      ><slot /></component>
    </div>
    <bar :size="sizeHeight" :move="moveY" />
  </div>
</template>
<script>
import Bar from './bar.vue'
export default {
  name: 'TScrollbar',
  components: { Bar },
  props: {
    height: [String, Number],
    tag: {
      type: String,
      default: 'div'
    },
    wrapClass: [String, Array],
    viewClass: [String, Array]
  },
  data() {
    return {
      sizeHeight: '0',
      moveY: 0
    }
  },
  computed: {
    style() {
      return { height: this.height }
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    handleScroll() {
      const wrap = this.$refs.wrap
      this.moveY = (wrap.scrollTop / wrap.clientHeight) * 100 // 计算 bar 移动自身多少倍（百分比）
    },
    update() {
      const wrap = this.$refs.wrap
      if (!wrap) return
      // console.log('wrap.clientHeight')
      // console.log(wrap.clientHeight)
      // console.log('wrap.scrollHeight')
      // console.log(wrap.scrollHeight)
      const heightPercentage = (wrap.clientHeight / wrap.scrollHeight) * 100
      this.sizeHeight = heightPercentage < 100 ? (heightPercentage + '%') : ''
    }
  }
}
</script>
<style lang="stylus">
.tulp-scrollbar
  position relative
  &__wrap
    overflow auto
    scrollbar-width none
    &::-webkit-scrollbar
      display none

</style>
