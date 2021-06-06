<template>
  <button
    class="t-button"
    :class="{
      'is-loading': loading,
      [`t-button__${type}`]: type,
      'is-error': error,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <t-icon v-if="icon && !loading" :name="icon" />
    <loading-icon v-if="loading" type="all" />
    <span class="t-button__content">
      <slot />
    </span>
  </button>
</template>
<script>
import LoadingIcon from './LoadingIcon.vue'
import Icon from './Icon.vue'
export default {
  name: 'TButton',
  components: { LoadingIcon, 't-icon': Icon },
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
<style lang="scss" src="../styles/button.scss"></style>
