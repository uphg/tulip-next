<template>
  <span
    class="tulp-countdown"
    :class="{ disable: disable }"
    @click="$emit('click', startCount)"
  >{{ currentText }}</span>
</template>
<script>
import '../../styles/countdown.scss'
export default {
  name: 'TCountdown',
  props: {
    beginSecond: {
      type: Number,
      default: 60
    },
    prompt: {
      type: String,
      default: '秒后重试'
    }
  },
  data() {
    return {
      currentTime: this.beginSecond,
      disable: false
    }
  },
  computed: {
    currentText() {
      const { disable, currentTime, prompt } = this
      return !disable ? '获取验证码' : currentTime + prompt
    }
  },
  methods: {
    startCount() {
      if (this.currentTime >= this.beginSecond && !this.disable) {
        this.disable = true
        this.$emit('count-start')
        this.clock()
      }
    },
    clock() {
      if (this.currentTime <= 0) {
        this.disable = false
        this.currentTime = this.beginSecond
        this.$emit('count-end')
        return false
      }
      const timer = setTimeout(() => {
        this.currentTime -= 1
        window.clearTimeout(timer)
        this.clock()
      }, 1000)
    }
  }
}
</script>
