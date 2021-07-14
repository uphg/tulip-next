<template>
  <div ref="bar" class="tulp-scrollbar__bar">
    <div class="tulp-scrollbar__thumb" :style="{ height: '30px', transform: `translateX(${move})` }" />
  </div>
</template>
<script>
export default {
  props: {
    move: Number,
    height: Number
  },
  mounted() {
    console.log('this.$refs.bar')
    console.log(this.$refs.bar)
  }
}
</script>
<style lang="stylus">
.tulp-scrollbar
  &__bar
    width 6px
    background-color #eee
    position absolute
    top 2px
    right 2px
    bottom 2px
    border-radius 4px
  &__thumb
    width 100%
    background-color #ccc
    border-radius inherit

</style>
