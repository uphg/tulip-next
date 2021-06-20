<template>
  <button
    class="tulp-button"
    :class="{
      'is-loading': loading,
      [`tulp-button__${type}`]: type,
      'is-disabled': disabled,
      'is-dashed': dashed,
      'is-ghost': ghost,
      'is-round': round,
      'is-circle': circle
    }"
    :disabled="disabled"
    @mouseup="mouseup"
    @click="$emit('click', $event)"
  >
    <span
      v-if="isWave"
      class="tulp-base__wave"
      :class="{ active: isWave }"
    />
    <t-icon v-if="icon && !loading" :name="icon" />
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
    <span v-if="$slots.default" class="tulp-button__content">
      <slot />
    </span>
  </button>
</template>
<script>
import '../../styles/button.styl'
import '../../styles/wave.styl'
import TIcon from '../icon/index.js'
export default {
  name: 'TButton',
  components: { TIcon },
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return value === 'default' || value === 'primary' || value === 'error'
      }
    },
    icon: {
      type: String,
      default: ''
    },
    loading: Boolean,
    disabled: Boolean,
    dashed: Boolean,
    ghost: Boolean,
    round: Boolean,
    circle: Boolean
  },
  data() {
    return {
      isWave: false,
      animationTimerId: null
    }
  },
  methods: {
    mouseup() {
      if (this.isWave) {
        window.clearTimeout(this.animationTimerId)
        this.isWave = false
        this.animationTimerId = null
      }
      this.$nextTick(() => {
        this.isWave = true
        this.animationTimerId = window.setTimeout(() => {
          this.isWave = false
          this.animationTimerId = null
        }, 1000)
      })
    },

    loadingTransitionEnter(el, done) {
      let loadId = setTimeout(() => {
        el.classList.add('active')
        window.clearTimeout(loadId)
        loadId = null
        let momentId = setTimeout(() => {
          window.clearTimeout(momentId)
          momentId = null
          done()
        }, 300)
      }, 0)
    },

    loadingTransitionLeave(el, done) {
      el.classList.remove('active')
      let momentId = setTimeout(() => {
        window.clearTimeout(momentId)
        momentId = null
        done()
      }, 300)
    }
  }
}
</script>
