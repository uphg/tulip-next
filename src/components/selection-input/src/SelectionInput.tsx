import { defineComponent, h, ref, Transition, TransitionGroup, type PropType } from 'vue'
import { TuBaseIcon } from '../../base-icon'
import { ArrowBottomRoundSmall, Clear } from '../../../icons'
import { useNameScope } from '../../../composables/useNameScope'

type SelectionInputValue = string | number | symbol | null

const SelectionInput = defineComponent({
  name: 'TuSelectionInput',
  props: {
    value: {
      type: [String, Number, Symbol, null] as PropType<SelectionInputValue>,
      default: ''
    },
    placeholder: String as PropType<string>,
    isHover: Boolean as PropType<boolean>,
    isFocus: Boolean as PropType<boolean>,
    disabled: Boolean as PropType<boolean>,
    clearable: Boolean as PropType<boolean>,
    onClickClear: Function as PropType<(e: MouseEvent) => void>
  },
  emits: ['focus', 'blur'],
  setup(props, context) {
    const ns = useNameScope('selection-input')

    function handleFocus(e: Event) {
      context.emit('focus', e)
    }

    function handleBlur(e: Event) {
      context.emit('blur', e)
    }

    function handleClickClear(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      props.onClickClear?.(e)
    }

    return () => {
      const { value, placeholder, disabled, isHover, isFocus, clearable } = props
      const ArrowIcon = <TuBaseIcon is={ArrowBottomRoundSmall} key="icon-1"/>

      return (
        <div
          class={[ns.base, {
            [ns.is('focus')]: isFocus,
            [ns.is('hover')]: isHover,
            [ns.is('disabled')]: disabled
          }]} 
          disabled={disabled}
          tabindex="0"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div class={ns.el('wrapper')}>
            {value
              ? <div class={ns.el('content')}>{value}</div>
              : <div class={ns.el('placeholder')}>
                  <span class={ns.el('placeholder-inner')}>{placeholder}</span>
                </div>}
          </div>
          <div class={ns.el('suffix')}>
            {context.slots.suffix ? context.slots.suffix() : (
              <div class={ns.el('icon-wrap')}>
                {clearable ? (
                  <div class={ns.suffix('clear')}>
                    <Transition name="tu-zoom">
                      {value && (isHover || isFocus) ? (
                        <TuBaseIcon is={Clear} onClick={handleClickClear}/>
                      ) : ArrowIcon}
                    </Transition>
                  </div>
                ) : ArrowIcon}
              </div>
            )}
          </div>
          <div class={ns.el('border')} />
        </div>
      )
    }
  }
})

export default SelectionInput