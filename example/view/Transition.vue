<template>
  <div>
    <div><button @click="show = !show">点击切换</button></div>
    <TExpandTransition>
      <div v-if="show" class="transition-block-level" style="padding: 20px 0;">
        <div class="transition-box">t-expand-transition</div>
      </div>
    </TExpandTransition>

    <div><button @click="show2 = !show2">点击切换</button></div>
    <TExpandTransition>
      <div v-show="show2" class="transition-block-level">
        <div class="transition-box">t-expand-transition</div>
      </div>
    </TExpandTransition>
  </div>
</template>
<script>
import TExpandTransition from '../../packages/transition/collapse-transition.js'
export default {
  components: {
    TExpandTransition
  },
  data() {
    return {
      show: false,
      show2: false,
      show3: false,
      show4: false
    }
  }
}
</script>
<style lang="stylus">
.transition-block-level
  // width 200px
  // height 100px
  // margin 20px
  // border 50px solid #dcf4ff
  // padding 20px
  background-color #eee
.transition-block
  width 200px
  height 100px
  padding 20px
  background-color #ecf5ff
.transition-box
  width 200px
  height 100px
  border-radius 4px
  background-color #409EFF
  text-align center
  color #fff
  padding 40px 20px
  box-sizing border-box
  margin-right 20px
</style>
