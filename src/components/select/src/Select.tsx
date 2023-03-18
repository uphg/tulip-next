import { computed, defineComponent, ref, toRef, watch, shallowRef, type PropType, type ExtractPropTypes, nextTick } from 'vue'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import TuScrollbar from '../../scrollbar/src/Scrollbar'
import TuPopup from '../../popup/src/Popup'
import { TuBaseIcon } from '../../base-icon'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import { isArray, remove, withAttrs } from '../../../utils'
import { Tick } from '../../../icons'
import type { SelectValue, Scrollbar, Popup } from '../../../types'
import type { SelectOption } from './types'

export type SelectProps = ExtractPropTypes<typeof selectProps>

const selectProps = {
  value: [String, Number, Array] as PropType<SelectValue | SelectValue[]>,
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  size: {
    type: String as PropType<'' | 'large' | 'medium' | 'small'>,
    validator: (value: string) => {
      return ['', 'large', 'medium', 'small'].includes(value)
    }
  },
  clearable: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  multiple: Boolean as PropType<boolean>
}

const Select = defineComponent({
  name: 'TuSelect',
  inheritAttrs: false,
  props: selectProps,
  emits: ['update:value'],
  setup(props, context) {
    const popup = shallowRef<Popup | null>(null)
    const trigger = shallowRef<HTMLElement | null>(null)
    const selectMenu = shallowRef<HTMLElement | null>(null)

    const _value = ref<SelectProps['value']>(props.value ? props.value : props.multiple ? [] : null)
    const scrollbar = ref<Scrollbar | null>(null)
    const selectedIndex = ref<number | null>(null)
    const checkmark = ref<SelectProps['value']>(getDefaultCheckmark())
    const isHover = ref(false)

    const input = computed(() => props.multiple
      ? getMultipleValues()
      : props.options?.find((item) => item.value === props.value)?.label
    )

    const { visible, close, open } = usePopupTriggerMode(trigger, { popup: selectMenu, triggerMode: 'click' })

    watch(toRef(props, 'value'), (newValue) => {
      checkmark.value = (props.multiple && isArray(newValue)) ? newValue[newValue.length - 1] : newValue
      _value.value = newValue
    })

    function handleClickOption(option: SelectOption) {
      if (props.multiple) {
        setMultipleValues(option)
      } else {
        setValue(option.value)
        close()
      }
    }

    function handleInputClick() {
      if (visible.value) {
        if (props.multiple) return
        close()
      } else {
        open()
      }
    }

    function handleOptionMouseMove(item: SelectOption) {
      checkmark.value = item.value
    }

    function handleEnter() {
      if (selectedIndex.value && selectedIndex.value > 5) {
        const container = scrollbar.value?.container
        const { offsetHeight: containerHeight } = withAttrs(container)
        const height = (selectedIndex.value + 1) * 34 - containerHeight + 8 // 8 为 padding 间隙误差
        scrollbar.value?.scrollTo({ top: height })
      }
    }

    function handleAfterLeave() {
      checkmark.value = getDefaultCheckmark()
      selectedIndex.value = null
    }

    function handleMouseEnter() {
      isHover.value = true
    }

    function handleMouseLeave() {
      isHover.value = false
    }

    function handleClearClick() {
      setValue(props.multiple ? [] : '')
    }

    function handleTagClose(option: SelectOption) {
      setMultipleValues(option)
    }

    function getDefaultCheckmark() {
      const value = isArray(props.value) ? props.value[0] : props.value
      return value ?? props.options?.[0]?.value
    }

    function isSelected(value: SelectValue) {
      return props.multiple ? isArray(props.value) && props.value.includes(value) : value === props.value
    }

    function getMultipleValues() {
      const prevValue = props.value as SelectValue[]
      if (!prevValue?.length) return []

      const result = []
      for (const item of prevValue) {
        const index = (props.options as SelectOption[])?.findIndex(option => option.value === item)
        if (index >= 0) {
          result.push(props.options[index])
        }
      }

      return result
    }

    function setMultipleValues(option: SelectOption) {
      const prevValue = _value.value as SelectValue[]
      const newValue = prevValue.includes(option.value)
        ? remove(prevValue!, (item) => item === option.value)
        : [...prevValue, option.value]

      setValue(newValue)
    }

    function setValue(newValue: SelectProps['value']) {
      _value.value = newValue
      context.emit('update:value', newValue)
    }

    return () => (
      <TuPopup
        ref={popup}
        visible={visible.value}
        placement="bottom-start"
        popupMargin="3"
        width="trigger"
        onEnter={handleEnter}
        onAfterLeave={handleAfterLeave}
      >
        {{
          trigger: () => (
            <div ref={trigger} class="tu-select">
              <TuSelectionInput
                value={input.value}
                isFocus={visible.value}
                isHover={isHover.value}
                clearable={props.clearable}
                disabled={props.disabled}
                multiple={props.multiple}
                size={props.size}
                onClick={handleInputClick}
                onMouseenter={handleMouseEnter}
                onMouseleave={handleMouseLeave}
                onClearClick={handleClearClick}
                onTagClose={handleTagClose}
              />
            </div>
          ),
          default: () => (
            <div ref={selectMenu} class="tu-select-menu">
              <TuScrollbar ref={scrollbar}>
                <div class="tu-select-options">
                  {props.options?.map((item, index) => {
                    if (item.value === props.value) {
                      selectedIndex.value = index
                    }
                    return (
                      <div
                        class={['tu-select-option', {
                          'tu-select-option--disabled': !!item?.disabled,
                          'tu-select-option--selected': isSelected(item.value),
                          'tu-select-option--pending': item.value === checkmark.value && !item?.disabled
                        }]}
                        key={index + 'opt'}
                        onClick={!item?.disabled ? (() => handleClickOption(item)) : void 0}
                        onMousemove={() => handleOptionMouseMove(item)}
                      >
                        <span class="tu-select-option__content">{item.label}</span>
                        {isSelected(item.value) ? <TuBaseIcon class="tu-select-option__icon--checkmark" is={Tick} /> : null}
                      </div>
                    )
                  })}
                </div>
              </TuScrollbar>
            </div>
          )
        }} 
      </TuPopup>
    )
  }
})

export default Select
