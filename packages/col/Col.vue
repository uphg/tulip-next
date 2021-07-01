<template>
  <div
    class="tulp-col"
    :style="gutterStyle"
    :class="{
      [`tulp-col-${span}`]: span,
      [`tulp-col-offset-${offset}`]: offset
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'TCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      gutter: 0
    }
  },
  computed: {
    gutterStyle() {
      const gutter = this.gutter
      if (!gutter) return
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      }
    }
  }
}
</script>
<style lang="stylus">
for num in (1..24)
  .tulp-col-{num}
    width (num / 24) * 100%

for num in (1..24)
  .tulp-col-offset-{num}
    margin-left (num / 24) * 100%
</style>
