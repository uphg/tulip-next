import { computed, defineComponent, ref, type PropType } from 'vue'

const SelectionInput = defineComponent({
  name: 'TuSelectionInput',
  props: {
    value: {
      type: [String, Number, Symbol, null] as PropType<string | number | symbol | null>,
      default: ''
    },
    placeholder: String as PropType<string>,
    focus: Boolean as PropType<boolean>,
    disabled: Boolean as PropType<boolean>
  },
  emits: ['focus', 'blur'],
  setup(props, context) {
    function handleFocus(e: Event) {
      context.emit('focus', e)
    }

    function handleBlur(e: Event) {
      context.emit('blur', e)
    }

    return () => (
      <div
        class={[
          'tu-selection-input',
          {
            'tu-selection-input--focus': props.focus,
            'tu-selection-input--disabled': props.disabled
          }
        ]} 
        disabled={props.disabled}
        tabindex="0"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div class="tu-selection-input__wrapper">
          {props.value
            ? <div class="tu-selection-input__content">{props.value}</div>
            : <div class="tu-selection-input__placeholder">
                <span class="tu-selection-input__placeholder-inner">{props.placeholder}</span>
              </div>}
        </div>
        {context.slots.suffix ? <div class="tu-selection-input__suffix">{context.slots.suffix()}</div> : null}
        <div class="tu-selection-input__border" />
      </div>
    )
  }
})

export default SelectionInput