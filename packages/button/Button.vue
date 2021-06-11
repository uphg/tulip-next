<template>
  <button
    class="tulp-button"
    :class="{
      'is-loading': loading,
      [`tulp-button__${type}`]: type,
      'is-error': error,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <t-icon v-if="icon && !loading" :name="icon" />
    <t-icon v-if="loading" class="tulp-loading" name="spinner-alt" />
    <span class="tulp-button__content">
      <slot />
    </span>
  </button>
</template>
<script>
import '../../styles/button.scss'
import TIcon from '../Icon.vue'
export default {
  name: 'TButton',
  components: { TIcon },
  props: {
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return value === 'default' || value === 'primary'
      }
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<!--<style lang="scss" src="../../styles/button.scss"></style>-->
