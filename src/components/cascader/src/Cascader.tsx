import { defineComponent, ref, shallowRef, onMounted, toRef, watch } from 'vue'
import { cascaderProps } from './props'
import type { CascaderBaseValue, CascaderOption, CascaderProps } from './props'
import CascaderSubmenu from './CascaderSubmenu'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import { useEmitter } from '../../../utils'
import { useCachedValue } from '../../../composables/useCachedValue'

const Cascader = defineComponent({
  name: 'TuCascader',
  props: cascaderProps,
  emits: ['update:value'],
  setup(props, context) {
    const trigger = shallowRef<HTMLElement | null>(null)
    const popup = shallowRef<HTMLElement | null>(null)
    const selectedOptions = ref<CascaderOption[] | []>([])
    const input = ref('')
    const isHover = ref(false)
    const rawValue = useCachedValue(props, 'value', {
      context,
      watchCallback(newValue) {
        selectedOptions.value = getSelectedOptions(newValue)
        updateInput()
      }
    })

    const emitter = useEmitter()
    const { events, visible, close } = usePopupTriggerMode(trigger, { popup: popup, triggerMode: 'click' })
    const { onClick: handlePopupClick } = events

    const { labelField, valueField, childrenField, disabledField } = props

    function handleOptionClick(level: number, option: CascaderOption) {
      const nextIndex = level + 1
      selectedOptions.value[level][valueField] = option[valueField]
      selectedOptions.value[level][labelField] = option[labelField]

      if (selectedOptions.value.length > nextIndex) {
        selectedOptions.value.splice(nextIndex, selectedOptions.value.length - nextIndex)
      }

      if ((option[childrenField] as CascaderOption[])?.length) {
        selectedOptions.value[nextIndex] = {
          [valueField]: null,
          [labelField]: null,
          [childrenField]: option[childrenField]
        }
      } else {
        // last option
        const newValues = selectedOptions.value.map(item => item.value) as CascaderBaseValue[]
        rawValue.value = newValues
        updateInput()
        close()
      }
    }

    function handlePopupEnter() {
      emitter.emit('onEnter')
    }

    function handleClearClick() {
      selectedOptions.value = getDefaultSelectedOptions()
      rawValue.value = []
      updateInput()
    }

    function handleMouseEnter() {
      isHover.value = true
    }

    function handleMouseLeave() {
      isHover.value = false
    }

    function getSelectedOptions(value: CascaderProps['value'] | null) {
      if (!value?.length) {
        return getDefaultSelectedOptions()
      }

      const result = []
      const selectedValues = [...value]
      let options = props.options

      while (selectedValues.length && options?.length) {
        const value = selectedValues.shift()
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

      return getDefaultSelectedOptions()
    }

    function getDefaultSelectedOptions() {
      return [{
        [valueField]: null,
        [labelField]: null,
        [childrenField]: props.options ? [...props.options] : []
      }]
    }

    function updateInput() {
      input.value = selectedOptions.value.map(item => item.label).join(' / ')
    }

    selectedOptions.value = getSelectedOptions(props.value)
    updateInput()

    return () => (
      <TuPopup
        visible={visible.value}
        placement="bottom-start"
        popupMargin="3"
        onEnter={handlePopupEnter}
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
                disabled={props.disabled}
                size={props.size}
                onClick={handlePopupClick}
                onMouseenter={handleMouseEnter}
                onMouseleave={handleMouseLeave}
                onClearClick={handleClearClick}
              />
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-cascader-menu">
              {selectedOptions.value?.map((item, index) => (
                <CascaderSubmenu
                  value={selectedOptions.value[index][valueField] as CascaderBaseValue}
                  options={item[childrenField] as CascaderOption[]}
                  labelField={labelField}
                  valueField={valueField}
                  childrenField={childrenField}
                  disabledField={disabledField}
                  emitter={emitter}
                  onUpdateValue={(option: CascaderOption) => handleOptionClick(index, option)}
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
