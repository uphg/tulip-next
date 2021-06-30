<template>
  <div class="tulp-row" :style="gutterStyle" :class="{ [`is-justify-${justify}`]: justify }">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'TRow',
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    justify: {
      type: String,
      validator(value) {
        return ['start', 'center', 'end', 'space-between', 'space-around'].includes(value)
      }
    }
  },
  computed: {
    gutterStyle() {
      const gutter = this.gutter
      if (!gutter) return
      return { marginLeft: `-${gutter / 2}px`, marginRight: `-${gutter / 2}px` }
    }
  },
  mounted() {
    const gutter = this.gutter
    this.$children.forEach(vm => {
      vm.gutter = gutter
    })
  }
}
</script>
<style lang="stylus">
.tulp-row
  display flex

justify(key, value)
  &.is-justify-{key}
    justify-content value

.tulp-row
  justify(start, flex-start)
  justify(center, center)
  justify(end, flex-end)
  justify(space-between, space-between)
  justify(space-around, space-around)
</style>
