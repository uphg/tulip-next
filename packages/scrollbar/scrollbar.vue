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
    <bar />
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
  computed: {
    style() {
      return { height: this.height }
    }
  },
  methods: {
    handleScroll() {
      console.log(123)
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
