import { defineComponent, ref, onMounted, toRef, watch, provide } from 'vue'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { ArrowBottomRoundSmall } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { Fn, SelectValue } from '../../../types'
import { cascaderProps, type CascaderOption } from './cascaderProps'
import CascaderSubmenu from './CascaderSubmenu'
import { useEmitter } from '../../../utils'

const Cascader = defineComponent({
  name: 'TuCascader',
  props: cascaderProps,
  emits: ['update:value'],
  setup(props, context) {
    const triggerEl = ref<HTMLElement | null>(null)
    const popup = ref<HTMLElement | null>(null)
    const input = ref('')
    const selected = ref<CascaderOption[] | []>([])

    const emitter = useEmitter()
    const { events, visible, close } = usePopupTriggerMode(triggerEl, { popup: popup, triggerMode: 'click' })
    const { onClick } = events as { onClick: Fn }

    watch(toRef(props, 'value'), updateInput)

    function handleClickOption(index: number, option: CascaderOption) {
      const nextIndex = index + 1
      selected.value[index].value = option.value
      selected.value[index].label = option.label

      if (selected.value.length > nextIndex) {
        selected.value.splice(nextIndex, selected.value.length - nextIndex)
      }

      if (option.children?.length) {
        selected.value[nextIndex] = {
          value: null,
          label: null,
          children: option.children
        }
      } else {
        // last
        updateValue()
        close()
      }
    }

    function onEnter() {
      emitter.emit('onEnter')
    }

    function onAfterLeave() {
      const select = selected.value
      if (select[select.length - 1].children) {
        selected.value = getSelected(props.value)
      }
    }

    function getSelected(value: SelectValue[]) {
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
            value: option.value,
            label: option.label,
            children: options!
          }
          result.push(newOption)
          options = option?.children
          if (!options) {
            return result
          }
        }
      }

      return getDefaultSelected()
    }

    function getDefaultSelected() {
      return [{
        value: null,
        label: null,
        children: props.options ? [...props.options] : []
      }]
    }

    function updateValue() {
      context.emit('update:value', selected.value.map(item => item.value))
    }

    function updateInput() {
      input.value = selected.value.map(item => item.label).join(' / ')
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
        onEnter={onEnter}
        onAfterLeave={onAfterLeave}
      >
        {{
          trigger: () => (
            <div ref={triggerEl} class="tu-cascader" onClick={onClick}>
              <TuSelectionInput value={input.value} focus={visible.value}>
                {{ suffix:() => <TuBaseIcon is={ArrowBottomRoundSmall}/> }}
              </TuSelectionInput>
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-cascader-menu">
              {selected.value?.map((item, index) => (
                <CascaderSubmenu
                  value={selected.value[index].value}
                  options={item.children}
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
