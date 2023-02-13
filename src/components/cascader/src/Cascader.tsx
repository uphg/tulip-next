import { computed, defineComponent, ref, nextTick, type PropType } from 'vue'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { isArray } from '../../../utils'
import { ArrowBottomSmallRound } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'
import { usePopupTriggerMode } from '../../../composables/usePopupTriggerMode'
import type { Fn } from '../../../types'

interface CascaderOption {
  lable: string | number,
  value: string | number | symbol,
  children: CascaderOption[]
}

const Cascader = defineComponent({
  name: 'TuCascader',
  props: {
    value: {
      type: [String, Number, Array, null] as PropType<string | number | Array<number | string> | null>,
      default: null
    },
    options: Array as PropType<CascaderOption[]>,
    placeholder: String as PropType<string>
  },
  emits: ['update:value'],
  setup(props, context) {
    const triggerEl = ref<HTMLElement | null>(null)
    const popup = ref<HTMLElement | null>(null)
    const input = computed(() => isArray(props.value) ? props.value.join(' / ') : props.value || '')

    const { events, visible } = usePopupTriggerMode(triggerEl, { popup: popup, triggerMode: 'click' })
    const { onClick } = events as { onClick: Fn }

    return () => (
      <TuPopup
        visible={visible.value}
        placement="bottom-start"
        popupMargin="3"
      >
        {{
          trigger: () => (
            <div ref={triggerEl} class="tu-cascader" onClick={onClick}>
              <TuSelectionInput value={input.value} focus={visible.value}>
                {{ suffix:() => <TuBaseIcon is={ArrowBottomSmallRound}/> }}
              </TuSelectionInput>
            </div>
          ),
          default: () => (
            <div ref={popup} class="tu-cascader-menu">
              <span style="display: flex; padding: 8px 12px;">我是一个选项</span>
            </div>
          )
        }} 
      </TuPopup>
    )
  }
})

export default Cascader
