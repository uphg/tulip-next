import { defineComponent, nextTick, ref, shallowRef, Transition, watch, type ExtractPropTypes } from 'vue'
import type { PropType } from 'vue'
import TuBaseIcon from '../../base-icon/src/BaseIcon'
import { Loading, Clear, Eye, EyeDisabled } from '../../../icons'
import { off, on } from '../../../utils'

export type InputProps = ExtractPropTypes<typeof inputProps>

const inputProps = {
  value: {
    type: String as PropType<string | null>,
    default: null
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
  clearable: Boolean as PropType<boolean>,
  visibilityToggle: String as PropType<'click' | 'mousedown'>,
}

const Input = defineComponent({
  name: 'TuInput',
  props: inputProps,
  emits: ['update:value'],
  setup(props, context) {
    const input = shallowRef<HTMLElement | null>(null)
    const rawValue = ref<InputProps['value']>(null)
    const isFocus = ref(false)
    const isHover = ref(false)
    const passwordVisible = ref(false)

    watch(() => props.value, (newValue) => {
      rawValue.value = newValue
    })

    function handleInput(e: Event) {
      const newValue = (e.target as HTMLInputElement).value
      if (newValue === props.value) return
      setValue(newValue)
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
      context.emit('update:value', null)
    }

    function handleClickEye() {
      if (props.visibilityToggle !== 'click') return
      setPasswordVisible(!passwordVisible.value)
    }

    function handleMouseDownEye() {
      if (props.visibilityToggle !== 'mousedown') return
      setPasswordVisible(true)
      on(document, 'mouseup', handleMouseUpDom)
    }

    function handleMouseUpDom() {
      setPasswordVisible(false)
      off(document, 'mouseup', handleMouseUpDom)
    }

    function setPasswordVisible(value: boolean) {
      input.value?.blur()
      passwordVisible.value = value
      nextTick(() => {
        input.value?.focus()
      })
    }

    function setValue(newValue: InputProps['value']) {
      rawValue.value = newValue
      context.emit('update:value', newValue)
    }

    return () => {
      const { type, status, disabled, placeholder, loading, visibilityToggle, clearable, size } = props
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
                  type={passwordVisible.value && type === 'password' ? 'text' : type}
                  ref={input}
                  value={rawValue.value}
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
                          {rawValue.value && (isHover.value || isFocus.value)
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
                  {visibilityToggle ? (
                    <div class="tu-input-eye">
                      <TuBaseIcon
                        class="tu-input-icon"
                        onClick={handleClickEye}
                        onMousedown={handleMouseDownEye}
                        is={passwordVisible.value ? Eye : EyeDisabled}/>
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