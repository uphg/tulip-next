import { computed, defineComponent, ref, toRef, watch, shallowRef, type PropType } from 'vue'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import TuScrollbar from '../../scrollbar/src/Scrollbar'
import { Tick } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { SelectValue, Scrollbar } from '../../../types'
import { withAttrs } from '../../../utils'

export type SelectOption = { label: string, value: SelectValue, disabled?: boolean }

const Select = defineComponent({
  name: 'TuSelect',
  inheritAttrs: false,
  props: {
    value: [String, Number] as PropType<SelectValue>,
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => []
    },
    clearable: Boolean as PropType<boolean>
  },
  emits: ['update:value'],
  setup(props, context) {
    const triggerEl = shallowRef<HTMLElement | null>(null)
    const popup = shallowRef<HTMLElement | null>(null)

    const scrollbar = ref<Scrollbar | null>(null)
    const selectedIndex = ref<number | null>(null)
    const checkmark = ref<SelectValue | undefined>(getDefaultCheckmark())
    const isHover = ref(false)

    const input = computed(() => props.options?.find((item) => item.value === props.value)?.label)

    watch(toRef(props, 'value'), (newValue) => {
      checkmark.value = newValue
    })

    const { events, visible, close } = usePopupTriggerMode(triggerEl, { popup: popup, triggerMode: 'click' })
    const { onClick } = events as { onClick: (e: Event) => void }

    function handleClickOption(item: SelectOption) {
      context.emit('update:value', item.value)
      close()
    }

    function handleMouseMoveOption(item: SelectOption) {
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

    function handleClickClear() {
      context.emit('update:value', '')
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
        onEnter={handleEnter}
        onAfterLeave={handleAfterLeave}
      >
        {{
          trigger: () => (
            <div ref={triggerEl} class="tu-select">
              <TuSelectionInput
                value={input.value}
                isFocus={visible.value}
                isHover={isHover.value}
                clearable={props.clearable}
                onClick={onClick}
                onMouseenter={handleMouseEnter}
                onMouseleave={handleMouseLeave}
                onClickClear={handleClickClear}
              />
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-select-menu">
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
                          'tu-select-option--selected': item.value === props.value,
                          'tu-select-option--pending': item.value === checkmark.value && !item?.disabled
                        }]}
                        key={index + 'opt'}
                        onClick={!item?.disabled ? (() => handleClickOption(item)) : void 0}
                        onMousemove={() => handleMouseMoveOption(item)}
                      >
                        <span class="tu-select-option__content">{item.label}</span>
                        {item.value === props.value ? <TuBaseIcon class="tu-select-option__icon--checkmark" is={Tick} /> : null}
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
