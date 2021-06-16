<template>
  <span
    class="tulp-countdown"
    :class="{ 'is-disable': disable, 'is-loading': loading }"
    @click="$emit('click', startCount)"
  >
    <t-icon
      v-if="loading"
      class="tulp-loading"
      name="spinner-alt"
    /><span class="tulp-countdown__text">{{ currentText }}</span></span>
</template>
<script>
import '../../styles/countdown.styl'
import TIcon from '../icon/Icon.vue'
export default {
  name: 'TCountdown',
  components: { TIcon },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
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
