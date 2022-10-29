import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

const inputProps = {
  value: {
    type: String as PropType<string | null>,
    default: ''
  },
  type: {
    type: String as PropType<'text' | 'password' | 'textarea'>,
    default: 'text'
  },
  disabled: Boolean,
  placeholder: String
}

const Input = defineComponent({
  name: 'TuInput',
  props: inputProps,
  emits: ['update:value'],
  setup(props, context) {
    const inputRef = ref<HTMLElement | null>(null)
    const isFocus = ref(false)
    const isHover = ref(false)

    const handleInput = (payload: Event) => {
      const newValue = (payload.target as HTMLTextAreaElement).value
      if (newValue === props.value) return
      context.emit('update:value', newValue)
    }

    const handleBlur = () => {
      isFocus.value = false
    }

    const handleMouseDown = (event: Event) => {
      const { tagName } = event.target as HTMLElement
      
      if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
        event.preventDefault()
        if (!isFocus.value) {
          inputRef.value?.focus()
        }
      } 
    }

    const handleMouseEnter = () => {
      isHover.value = true
    }

    const handleMouseLeave = () => {
      isHover.value = false
    }

    const handleFocus = () => {
      isFocus.value = true
    }
    return () => {
      const { value, type, disabled, placeholder } = props
      const { slots } = context
      return (
        <div
          class={[
            'tu-input',
            {
              'tu-input--disabled': disabled,
              'tu-input--focus': isFocus.value,
            }
          ]}
          onMousedown={handleMouseDown}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          {type !== 'textarea' ? (
            <div class="tu-input__wrapper">
              {slots.prefix ? (
                <div class="tu-input__prefix">
                  {slots.prefix()}
                </div>
              ) : null}
              <div class="tu-input__inner-wrap">
                <input
                  class="tu-input__inner"
                  type={type}
                  ref={inputRef}
                  value={value}
                  disabled={disabled}
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onInput={handleInput}
                />
              </div>
              {slots.suffix ? (
                <div class="tu-input__suffix">
                  {slots.suffix()}
                </div>
              ) : null}
            </div>
          ) : (
            <div class="tu-textarea">
              <textarea
                class="tu-textarea__inner"
                disabled={disabled}
              />
            </div>
          )}
          <div class="tu-input__border" />
          <div class="tu-input__state-border" />
        </div>
      )
    }
  }
})

export default Input