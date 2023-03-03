import { defineComponent, ref, shallowRef, onMounted, toRef, watch } from 'vue'
import { cascaderProps, type CascaderBaseValue, type CascaderOption, type CascaderProps } from './props'
import CascaderSubmenu from './CascaderSubmenu'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { Fn, SelectValue } from '../../../types'
import { isArray, useEmitter } from '../../../utils'

const Cascader = defineComponent({
  name: 'TuCascader',
  props: cascaderProps,
  emits: ['update:value'],
  setup(props, context) {
    const trigger = shallowRef<HTMLElement | null>(null)
    const popup = shallowRef<HTMLElement | null>(null)
    const input = ref('')
    const selected = ref<CascaderOption[] | []>([])
    const isHover = ref(false)

    const emitter = useEmitter()
    const { events, visible, close } = usePopupTriggerMode(trigger, { popup: popup, triggerMode: 'click' })
    const { onClick } = events as { onClick: Fn }

    const { labelField, valueField, childrenField, disabledField } = props

    watch(toRef(props, 'value'), updateInput)

    function handleClickOption(index: number, option: CascaderOption) {
      const nextIndex = index + 1
      selected.value[index][valueField] = option[valueField]
      selected.value[index][labelField] = option[labelField]

      if (selected.value.length > nextIndex) {
        selected.value.splice(nextIndex, selected.value.length - nextIndex)
      }

      if ((option[childrenField] as CascaderOption[])?.length) {
        selected.value[nextIndex] = {
          [valueField]: null,
          [labelField]: null,
          [childrenField]: option[childrenField]
        }
      } else {
        // last
        updateValue()
        close()
      }
    }

    function handleEnter() {
      emitter.emit('onEnter')
    }

    function handleAfterLeave() {
      const select = selected.value
      if (select[select.length - 1][childrenField]) {
        selected.value = getSelected(props.value)
      }
    }

    function getSelected(value: CascaderProps['value'] | null) {
      if (!value?.length) {
        return getDefaultSelected()
      }

      const result = []
      const optionValues = [...value]
      let options = props.options

      while (optionValues.length && options?.length) {
        const value = optionValues.shift()
        const option = options?.find((option) => option?.value === value)
        if (option) {
          const newOption: CascaderOption = {
            [valueField]: option[valueField],
            [labelField]: option[labelField],
            [childrenField]: options!
          }
          result.push(newOption)
          options = option?.[childrenField] as CascaderOption[]
          if (!options) {
            return result
          }
        }
      }

      return getDefaultSelected()
    }

    function getDefaultSelected() {
      return [{
        [valueField]: null,
        [labelField]: null,
        [childrenField]: props.options ? [...props.options] : []
      }]
    }

    function updateValue() {
      context.emit('update:value', selected.value.map(item => item.value))
    }

    function updateInput() {
      input.value = selected.value.map(item => item.label).join(' / ')
    }

    function handleMouseEnter() {
      isHover.value = true
    }

    function handleMouseLeave() {
      isHover.value = false
    }

    function handleClickClear() {
      const result: [] | null = isArray(props.value) ? [] : null 
      context.emit('update:value', result)
      selected.value = getSelected(result)
    }

    onMounted(() => {
      selected.value = getSelected(props.value)
      updateInput()
    })

    return () => (
      <TuPopup
        visible={visible.value}
        placement="bottom-start"
        popupMargin="3"
        onEnter={handleEnter}
        onAfterLeave={handleAfterLeave}
      >
        {{
          trigger: () => (
            <div ref={trigger} class="tu-cascader">
              <TuSelectionInput
                value={input.value}
                placeholder={props.placeholder}
                isHover={isHover.value}
                isFocus={visible.value}
                clearable={props.clearable}
                onClick={onClick}
                onMouseenter={handleMouseEnter}
                onMouseleave={handleMouseLeave}
                onClickClear={handleClickClear}
              />
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-cascader-menu">
              {selected.value?.map((item, index) => (
                <CascaderSubmenu
                  value={selected.value[index][valueField] as CascaderBaseValue}
                  options={item[childrenField] as CascaderOption[]}
                  labelField={labelField}
                  valueField={valueField}
                  childrenField={childrenField}
                  disabledField={disabledField}
                  emitter={emitter}
                  onUpdateValue={(option: CascaderOption) => handleClickOption(index, option)}
                />
              ))}
            </div>
          )
        }} 
      </TuPopup>
    )
  }
})

export default Cascader
