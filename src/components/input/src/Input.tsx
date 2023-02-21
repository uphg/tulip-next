import { defineComponent, ref, shallowRef, Transition } from 'vue'
import type { PropType } from 'vue'
import TuBaseIcon from '../../base-icon/src/BaseIcon'
import { Loading, Clear } from '../../../icons'
import { emit } from 'process'

const inputProps = {
  value: {
    type: String as PropType<string | null>,
    default: ''
  },
  type: {
    type: String as PropType<'text' | 'password' | 'textarea'>,
    default: 'text'
  },
  status: {
    type: String as PropType<'success' | 'warning' | 'error'>
  },
  size: {
    type: String as PropType<'' | 'large' | 'medium' | 'small'>,
    validator: (value: string) => {
      return ['', 'large', 'medium', 'small'].includes(value)
    }
  },
  placeholder: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  loading: Boolean as PropType<boolean>,
  clearable: Boolean as PropType<boolean>
}

const Input = defineComponent({
  name: 'TuInput',
  props: inputProps,
  emits: ['update:value'],
  setup(props, context) {
    const input = shallowRef<HTMLElement | null>(null)
    const isFocus = ref(false)
    const isHover = ref(false)

    function handleInput(payload: Event) {
      const newValue = (payload.target as HTMLTextAreaElement).value
      if (newValue === props.value) return
      context.emit('update:value', newValue)
    }

    function handleBlur() {
      isFocus.value = false
    }

    function handleMouseDown(event: Event) {
      const { tagName } = event.target as HTMLElement
      
      if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
        event.preventDefault()
        if (!isFocus.value) {
          input.value?.focus()
        }
      } 
    }

    function handleMouseEnter() {
      isHover.value = true
    }

    function handleMouseLeave() {
      isHover.value = false
    }

    function handleFocus() {
      isFocus.value = true
    }

    function handleClickClear() {
      context.emit('update:value', '')
    }

    return () => {
      const { value, type, status, disabled, placeholder, loading, clearable, size } = props
      const { slots } = context

      return (
        <div
          class={[
            'tu-input',
            {
              [`tu-input--status-${status}`]: status,
              [`tu-input--${size}`]: size,
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
                  ref={input}
                  value={value}
                  disabled={disabled}
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onInput={handleInput}
                />
              </div>
              {clearable || slots.suffix || loading ? (
                <div class="tu-input__suffix">
                  {clearable ? (
                    <div class="tu-input-clear">
                      <div class="tu-input-clear__inner">
                        <Transition name="tu-zoom">
                          {value && (isHover.value || isFocus.value)
                            ? <TuBaseIcon
                                class="tu-input-icon"
                                is={Clear}
                                onClick={handleClickClear}/>
                            : null}
                        </Transition>
                      </div>
                    </div>
                  ) : null}
                  {slots.suffix?.()}
                  {loading ? (
                    <div class="tu-input-loading">
                      <TuBaseIcon class="tu-input-icon" is={Loading}/>
                    </div>
                  ) : null}
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
        </div>
      )
    }
  }
})

export default Input