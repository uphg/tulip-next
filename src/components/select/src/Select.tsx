import { computed, defineComponent, ref, nextTick, type PropType } from 'vue'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { ArrowBottomRoundSmall, Tick } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { Fn, SelectValue } from '../../../types'
import TuScrollbar from '../../scrollbar/src/Scrollbar'

type SelectOptionItem = { label: string, value: SelectValue, disabled?: boolean }

const Select = defineComponent({
  name: 'TuSelect',
  props: {
    value: [String, Number, Symbol] as PropType<SelectValue>,
    options: Array as PropType<SelectOptionItem[]>
  },
  emits: ['update:value'],
  setup(props, context) {
    const triggerEl = ref<HTMLElement | null>(null)
    const popup = ref<HTMLElement | null>(null)
    const checkmark = ref(getDefaultCheckmark())
    const input = computed(() => props.options?.find((item) => item.value === props.value)?.label)

    const { events, visible, close } = usePopupTriggerMode(triggerEl, { popup: popup, triggerMode: 'click' })
    const { onClick } = events as { onClick: Fn }

    function handleClickOptionItem(item: SelectOptionItem) {
      context.emit('update:value', item.value)
      close()
    }

    function handleMousemoveOptionItem(item: SelectOptionItem) {
      checkmark.value = item.value
    }

    function onAfterLeave() {
      checkmark.value = getDefaultCheckmark()
    }

    function getDefaultCheckmark() {
      return props.value ?? props.options?.[0]?.value
    }

    return () => (
      <TuPopup
        visible={visible.value}
        placement="bottom-start"
        popupMargin="3"
        width="trigger"
        onAfterLeave={onAfterLeave}
      >
        {{
          trigger: () => (
            <div ref={triggerEl} class="tu-select" onClick={onClick}>
              <TuSelectionInput value={input.value} focus={visible.value}>
                {{ suffix:() => <TuBaseIcon is={ArrowBottomRoundSmall}/> }}
              </TuSelectionInput>
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-select-menu">
              <TuScrollbar style={{ maxHeight: '200px' }}>
                <div class="tu-select-options">
                  {props.options?.map((item, index) => (
                    <div
                      class={['tu-select-option', {
                        'tu-select-option--disabled': !!item?.disabled,
                        'tu-select-option--selected': item.value === props.value,
                        'tu-select-option--pending': item.value === checkmark.value && !item?.disabled
                      }]}
                      key={index + 'opt'}
                      onClick={!item?.disabled ? (() => handleClickOptionItem(item)) : void 0}
                      onMousemove={() => handleMousemoveOptionItem(item)}
                    >
                      <span class="tu-select-option__content">{item.label}</span>
                      {item.value === props.value ? <TuBaseIcon class="tu-select-option__icon--checkmark" is={Tick} /> : null}
                    </div>
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
