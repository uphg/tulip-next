<template>
  <span
    class="tulp-captcha-countdown"
    :class="{ 'is-disable': disable, 'is-loading': loading }"
    @click="$emit('click', startCount)"
  >
    <transition
      appear
      :css="false"
      @enter="loadingTransitionEnter"
      @leave="loadingTransitionLeave"
    >
      <span v-if="loading" class="tulp-button-loading">
        <LoadingIcon />
      </span>
    </transition>
    <span class="tulp-captcha-countdown__text">{{ currentText }}</span></span>
</template>
<script>
import '../../styles/captcha-countdown.styl'
import LoadingIcon from '../loading-icon/LoadingIcon.vue'
import loadingTransition from '../mixins/loading-transition.js'
export default {
  name: 'TCaptchaCountdown',
  components: { LoadingIcon },
  mixins: [loadingTransition],
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
      let timerId = setTimeout(() => {
        this.currentTime -= 1
        window.clearTimeout(timerId)
        timerId = null
        this.clock()
      }, 1000)
    }
  }
}
</script>
