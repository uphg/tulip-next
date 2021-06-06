<template>
  <div class="t-input" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <template v-if="type !== 'textarea'">
      <input
        ref="input"
        class="t-input__control"
        :type="inputType"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span
        v-if="showPasswordIcon"
        class="t-input__password-icon"
        @click="handlePasswordVisible"
      >
        <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="t-icon-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="t-icon-eye-slash" viewBox="0 0 16 16">
          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
        </svg>
      </span>
      <span
        v-if="showClearIcon"
        class="t-input__clear-icon"
        @mousedown.prevent
        @click="clear"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="t-icon-close"
        >
          <path
            d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </template>
    <textarea
      v-else
      ref="textarea"
      class="t-textarea__control"
      :disabled="disabled"
      :readonly="readonly"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

  </div>
</template>

<script>
export default {
  name: 'TInput',

  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      passwordVisible: false,
      focused: false,
      hovering: false
    }
  },

  computed: {
    inputValue() {
      return !this.value ? '' : String(this.value)
    },
    inputType() {
      return this.showPassword ? (this.passwordVisible ? 'text' : 'password') : this.type
    },
    showPasswordIcon() {
      return this.showPassword && !this.disabled && !this.readonly && (!!this.inputValue || this.focused)
    },
    showClearIcon() {
      return this.clearable && this.inputValue && (this.focused || this.hovering)
    }
  },

  watch: {
    inputValue() {
      this.setInputValue()
    }
  },

  mounted() {
    this.setInputValue()
  },

  methods: {
    focus() {
      this.getInput().focus()
    },
    blur() {
      this.getInput().blur()
    },
    handleInput(event) {
      const elValue = event.target.value
      if (elValue === this.inputValue) return
      this.$emit('input', elValue)
      this.$nextTick(this.setInputValue)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.$nextTick(() => {
        this.getInput().focus()
      })
    },
    setInputValue() {
      const input = this.getInput()
      if (!input) return
      if (input.value === this.inputValue) return
      input.value = this.inputValue
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea
    }
  }
}
</script>
<style lang="scss" src="../styles/input.scss"></style>
