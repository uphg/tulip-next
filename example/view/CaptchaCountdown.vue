<template>
  <div class="captcha-countdown-demo">
    <div>
      <t-captcha-countdown
        ref="countdown2"
        prompt="秒后重新发送"
        :begin-second="5"
        :loading="countLoading"
        @count-start="isCount2 = true"
        @count-end="isCount2 = false"
        @click="countLoading = !countLoading"
      />
    </div>
    <h2>倒计时</h2>
    <div class="row">
      <span class="label">倒计时按钮：</span>
      <t-captcha-countdown
        ref="countdown"
        prompt="秒后重新发送"
        :begin-second="5"
        @count-start="isCount = true"
        @count-end="isCount = false"
        @click="clickCount"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countLoading: false,
      isCount: false
    }
  },
  methods: {
    clickCount() {
      if (!this.isCount) {
        this.$refs['countdown'].startCount()
      }
    },
    clickCount2() {
      if (!this.isCount2) {
        this.$refs['countdown2'].startCount()
      }
    }
  }
}
</script>
