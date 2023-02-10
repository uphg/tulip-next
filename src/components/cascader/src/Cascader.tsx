import { computed, defineComponent, ref, nextTick, type PropType } from 'vue'
import TuPopup from '../../popup/src/Popup'
import TuSelectionInput from '../../selection-input/src/SelectionInput'
import { isArray, off, on, isTarget } from '../../../utils'
import { ArrowBottomSmallRound } from '../../../icons'
import { TuBaseIcon } from '../../base-icon'

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
    options: Array,
    placeholder: String as PropType<string>
  },
  emits: ['update:value'],
  setup(props, context) {
    const input = computed(() => isArray(props.value) ? props.value.join(' / ') : props.value || '')
    const visible = ref(false)
    const mousedown = ref(false)

    const trigger = ref<HTMLElement | null>(null)
    const menu = ref<HTMLElement | null>(null)

    function onClick() {
      if (visible.value) {
        visible.value = false
      } else {
        visible.value = true
        nextTick(() => {
          on(document, 'mousedown', handleDomMousedown)
          on(document, 'mouseup', handleDomMouseup)
        })
      }
    }

    function handleDomMousedown(event: MouseEvent) {
      if (isTarget(menu.value, event)) return
      mousedown.value = true
    }
  
    function handleDomMouseup(event: MouseEvent) {
      if (!isTarget(trigger.value, event) && !isTarget(menu.value, event) && mousedown.value) {
        visible.value = false
        off(document, 'mousedown', handleDomMousedown)
        off(document, 'mouseup', handleDomMouseup)
      }
      if (mousedown.value) {
        mousedown.value = false
      }
    }

    return () => (
      <TuPopup
        visible={visible.value}
        trigger={'manual'}
        placement={'bottom-start'}
        popupMargin="3"
      >
        {{
          trigger: () => (
            <div ref={trigger} class="tu-cascader">
              <TuSelectionInput value={input.value} focus={visible.value} onClick={onClick}>
                {{
                  suffix:() => <TuBaseIcon is={ArrowBottomSmallRound} />
                }}
              </TuSelectionInput>
            </div>
          ),
          default: () => (
            <div ref={menu} class="tu-cascader-menu">
              <span style="display: flex; padding: 8px 12px;">我是一个选项</span>
            </div>
          )
        }} 
      </TuPopup>
    )
  }
})

export default Cascader
