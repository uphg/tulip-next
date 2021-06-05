<template>
  <button
    class="t-button"
    :class="{
      'is-loading': loading,
      [`t-button__${type}`]: type,
      'is-error': error
    }"
    @click="$emit('click')"
  >
    <svg v-if="icon && !loading" :class="{ [`t-icon-${icon}`]: icon }" aria-hidden="true">
      <use :xlink:href="`#icon-${icon}`" />
    </svg>
    <LoadingIcon v-if="loading" type="all" />
    <span class="t-button__content">
      <slot />
    </span>
  </button>
</template>
<script>
import LoadingIcon from './LoadingIcon.vue'
export default {
  name: 'TButton',
  components: { LoadingIcon },
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
    }
  }
}
</script>
<style lang="scss" src="../styles/button.scss"></style>
