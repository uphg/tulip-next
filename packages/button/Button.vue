<template>
  <button
    class="tulp-button"
    :class="{
      [`tulp-button--${type}`]: type,
      [`tulp-button-size--${size}`]: size,
      'is-loading': loading,
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
    <transition
      @before-enter="iconBeforeEnter"
      @enter="iconEnter"
      @after-enter="iconAfterEnter"
      @before-leave="iconBeforeLeave"
      @leave="iconLeave"
      @after-leave="iconAfterLeave"
    >
      <span v-if="loading" class="tulp-button__loading">
        <LoadingIcon />
      </span>
      <span v-if="icon && !loading" class="tulp-button__icon">
        <t-icon :name="icon" />
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
import loadingTransition from '../../src/mixins/loading-transition.js'
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
    size: {
      type: String,
      default: '',
      validator(value) {
        return value === '' || value === 'big' || value === 'small'
      }
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
