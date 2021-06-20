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
      'is-circle': circle,
      'is-text': text
    }"
    :disabled="disabled"
    @mouseup="mouseup"
    @click="$emit('click', $event)"
  >
    <span
      v-if="isWave && !text"
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
        <LoadingIcon />
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
import LoadingIcon from '../loading-icon/LoadingIcon.vue'
import loadingTransition from '../mixins/loading-transition.js'
export default {
  name: 'TButton',
  components: { TIcon, LoadingIcon },
  mixins: [loadingTransition],
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return value === 'default' || value === 'primary' || value === 'success' || value === 'info' || value === 'warning' || value === 'error'
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
    circle: Boolean,
    text: Boolean
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
    }
  }
}
</script>
