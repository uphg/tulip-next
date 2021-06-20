<template>
  <button
    class="tulp-button"
    :class="{
      'is-loading': loading,
      [`tulp-button__${type}`]: type,
      'is-disabled': disabled,
      'is-dashed': dashed,
      'is-ghost': ghost
    }"
    :disabled="disabled || loading"
    @mouseup="mouseup"
    @click="$emit('click', $event)"
  >
    <span
      v-if="isWave"
      class="tulp-base__wave"
      :class="{ active: isWave }"
    />
    <t-icon v-if="icon && !loading" :name="icon" />
    <t-icon v-if="loading" class="tulp-loading" name="spinner-alt" />
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
    ghost: Boolean
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
