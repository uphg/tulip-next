<template>
  <span
    class="tulp-countdown"
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
        <svg
          class="tulp-button-loading__icon"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="1s"
              repeatCount="indefinite"
            />
            <circle
              fill="none"
              stroke="currentColor"
              stroke-width="20"
              stroke-linecap="round"
              cx="100"
              cy="100"
              r="90"
              stroke-dasharray="700"
              stroke-dashoffset="1000"
            />
          </g>
        </svg>
      </span>
    </transition>
    <span class="tulp-countdown__text">{{ currentText }}</span></span>
</template>
<script>
import '../../styles/countdown.styl'
import TIcon from '../icon/Icon.vue'
import loadingTransition from '../mixins/loading-transition.js'
export default {
  name: 'TCountdown',
  components: { TIcon },
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
