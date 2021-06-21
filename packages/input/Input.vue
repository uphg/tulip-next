<template>
  <div
    :class="[
      type === 'textarea' ? 'tulp-textarea' : 'tulp-input',
      {
        [`tulp-input-size__${size}`]: size,
        'tulp-input-group-addon': $slots.before || $slots.after,
        'tulp-input-group-addon--before': $slots.before,
        'tulp-input-group-addon--after': $slots.after,
        'exist-prefix': prefixIcon || $slots.prefix,
        'exist-suffix': suffixIcon || $slots.suffix || showPassword || clearable,
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <span v-if="$slots.before" class="tulp-input-addon tulp-input-addon__before">
        <slot name="before" />
      </span>
      <input
        ref="input"
        class="tulp-input__control"
        :type="inputType"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span v-if="prefixIcon || $slots.prefix" class="tulp-input__prefix">
        <span class="tulp-input__prefix-icon">
          <slot name="prefix" />
          <t-icon v-if="prefixIcon" class="tulp-input__icon" :name="prefixIcon" />
        </span>
      </span>
      <span v-if="showSuffix" class="tulp-input__suffix">
        <template v-if="!showPasswordIcon && !showClearIcon">
          <span class="tulp-input__suffix-icon">
            <slot name="suffix" />
            <t-icon v-if="suffixIcon" class="tulp-input__icon" :name="suffixIcon" />
          </span>
        </template>
        <span
          v-if="showPasswordIcon"
          class="tulp-input__password"
          @click="handlePasswordVisible"
        >
          <t-icon v-if="passwordVisible" class="tulp-input__icon" name="eye" />
          <t-icon v-else class="tulp-input__icon" name="eye-slash" />
        </span>
        <span
          v-if="showClearIcon"
          class="tulp-input__clear"
          @mousedown.prevent
          @click="clear"
        >
          <t-icon class="tulp-input__icon" name="close-o" />
        </span>
      </span>
      <span v-if="$slots.after" class="tulp-input-addon tulp-input-addon__after">
        <slot name="after" />
      </span>
    </template>
    <textarea
      v-else
      ref="textarea"
      class="tulp-textarea__control"
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
import Icon from '../icon/Icon.vue'
import '../../styles/input.styl'
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
    size: {
      type: String,
      default: '',
      validator(value) {
        return value === '' || value === 'big' || value === 'small'
      }
    },
    disabled: Boolean,
    readonly: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    showPassword: Boolean,
    clearable: Boolean
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
    showSuffix() {
      return this.suffixIcon || this.$slots.suffix || this.showClearIcon || this.showPasswordIcon
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
    this.updateIconOffset()
  },

  updated() {
    this.$nextTick(this.updateIconOffset)
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
    },
    calcIconOffset(type) {
      const elements = [...this.$el.querySelectorAll(`.tulp-input__${type}`)]
      if (!elements.length) return
      let el = null
      for (const element of elements) {
        if (element.parentNode === this.$el) {
          el = element
          break
        }
      }
      if (!el) return
      if (!(el.parentNode === this.$el)) return
      const map = {
        suffix: 'after',
        prefix: 'before'
      }
      const key = map[type]
      if (this.$slots[key]) {
        el.style.transform = `translateX(${type === 'suffix' ? '-' : ''}${this.$el.querySelector(`.tulp-input-addon__${key}`).offsetWidth + 'px'}`
      } else {
        el.removeAttribute('style')
      }
    },
    updateIconOffset() {
      this.calcIconOffset('suffix')
      this.calcIconOffset('prefix')
    }
  }
}
</script>
