<template>
  <div
    :class="[
      type === 'textarea' ? 't-textarea' : 't-input',
      {
        'exist-suffix': showPassword || clearable,
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- <span class="t-input__prefix"></span> -->
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
      <span class="t-input__suffix">
        <span
          v-if="showPasswordIcon"
          class="t-input__password"
          @click="handlePasswordVisible"
        >
          <t-icon v-if="passwordVisible" class="t-input__icon" name="eye" />
          <t-icon v-else class="t-input__icon" name="eye-slash" />
        </span>
        <span
          v-if="showClearIcon"
          class="t-input__clear"
          @mousedown.prevent
          @click="clear"
        >
          <t-icon class="t-input__icon" name="close-o" />
        </span>
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
import Icon from './Icon.vue'
export default {
  name: 'TInput',
  components: { 'TIcon': Icon },

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
