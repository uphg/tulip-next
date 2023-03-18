import { computed, defineComponent, Transition, type ExtractPropTypes, type PropType } from 'vue'
import { TuBaseIcon } from '../../base-icon'
import { ArrowBottomRoundSmall, Clear } from '../../../icons'
import { useNameScope } from '../../../composables/useNameScope'
import type { SelectOption } from '../../select/src/types'
import { TuSpace } from '../../space'
import { TuTag } from '../../tag'

export type SelectionInputProps = ExtractPropTypes<typeof selectionInputProps>

export const selectionInputProps = {
  value: {
    type: [String, Number, Array] as PropType<string | number | SelectOption[]>,
    default: ''
  },
  size: String as PropType<'' | 'large' | 'medium' | 'small'>,
  placeholder: String as PropType<string>,
  isHover: Boolean as PropType<boolean>,
  isFocus: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  clearable: Boolean as PropType<boolean>,
  multiple: Boolean as PropType<boolean>,
  onClick: Function as PropType<(e: MouseEvent) => void>,
  onFocus: Function as PropType<(e: MouseEvent) => void>,
  onBlur: Function as PropType<(e: MouseEvent) => void>,
  onClearClick: Function as PropType<(e: MouseEvent) => void>,
  onTagClose: Function as PropType<(option: SelectOption) => void>
}

const SelectionInput = defineComponent({
  name: 'TuSelectionInput',
  props: selectionInputProps,
  setup(props, context) {
    const ns = useNameScope('selection-input')
    const clearVisible = computed(() => {
      const { value, multiple, disabled, isHover, isFocus } = props
      return (multiple ? (value as SelectOption[]).length : value)  && !disabled && (isHover || isFocus)
    })

    function handleClick(e: Event) {
      if (props.disabled) return
      props.onClick?.(e as MouseEvent)
    }

    function handleFocus(e: Event) {
      if (props.disabled) return
      props.onFocus?.(e as MouseEvent)
    }
    
    function handleBlur(e: Event) {
      if (props.disabled) return
      props.onBlur?.(e as MouseEvent)
    }

    function handleClickClear(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      props.onClearClick?.(e)
    }

    return () => {
      const { value, placeholder, disabled, isHover, isFocus, clearable } = props
      const ArrowIcon = <TuBaseIcon is={ArrowBottomRoundSmall} key="icon-1"/>
      // const clearVisible = value && !disabled && (isHover || isFocus)

      return (
        <div
          class={[ns.base, {
            [ns.is(props.size)]: props.size,
            [ns.is('focus')]: isFocus,
            [ns.is('hover')]: isHover,
            [ns.is('disabled')]: disabled
          }]}
          tabindex="0"
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div class={ns.el('wrapper')}>
            {value
              ? (
                <div class={ns.el('content')}>
                  {props.multiple ? (
                    <div class={ns.el('tags')}>
                      {(value as SelectOption[]).map(item => (<TuTag size={props.size} disabled={props.disabled} closable={!item.disabled} onClose={props.onTagClose && (() => props.onTagClose!(item))}>{item.label}</TuTag>))}
                    </div>
                  ) : value}
                </div>
              ) : (
                <div class={ns.el('placeholder')}>
                  <span class={ns.el('placeholder-inner')}>{placeholder}</span>
                </div>
              )}
          </div>
          <div class={ns.el('suffix')}>
            {context.slots.suffix ? context.slots.suffix() : (
              <div class={ns.el('icon-wrap')}>
                {clearable ? (
                  <div class={[ns.suffix('clear'), { [ns.suffix('clear--visible')]: clearVisible.value }]}>
                    <Transition name="tu-zoom">
                      {clearVisible.value ? (
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