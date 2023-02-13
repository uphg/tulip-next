import { computed, defineComponent, ref, nextTick, type PropType } from 'vue'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { ArrowBottomSmallRound } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { Fn } from '../../../types'
import TuScrollbar from '../../scrollbar/src/Scrollbar'

type OptionItem = { label: string, value: string | number | symbol }

const Select = defineComponent({
  name: 'TuSelect',
  props: {
    value: [String, Number, Symbol] as PropType<string | number | symbol>,
    options: Array as PropType<OptionItem[]>
  },
  emits: ['update:value'],
  setup(props, context) {
    const triggerEl = ref<HTMLElement | null>(null)
    const popup = ref<HTMLElement | null>(null)
    const input = computed(() => props.options?.find((item) => item.value === props.value)?.label)

    const { events, visible, close } = usePopupTriggerMode(triggerEl, { popup: popup, triggerMode: 'click' })
    const { onClick } = events as { onClick: Fn }

    function onClickOptionItem(item: OptionItem) {
      context.emit('update:value', item.value)
      close()
    }

    return () => (
      <TuPopup
        visible={visible.value}
        placement="bottom-start"
        popupMargin="3"
        width="trigger"
      >
        {{
          trigger: () => (
            <div ref={triggerEl} class="tu-select" onClick={onClick}>
              <TuSelectionInput value={input.value} focus={visible.value}>
                {{ suffix:() => <TuBaseIcon is={ArrowBottomSmallRound}/> }}
              </TuSelectionInput>
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-select-menu">
              <TuScrollbar style={{ maxHeight: '200px' }}>
                <div class="tu-select-options">
                  {props.options?.map((item, index) => (
                    <div
                      class={['tu-select-option-item', { 'tu-select-option-item--active': item.value === props.value }]}
                      key={index + 'opt'}
                      onClick={() => onClickOptionItem(item)}
                    >{item.label}</div>
                  ))}
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
