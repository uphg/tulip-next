import { defineComponent, onBeforeUnmount, ref, type PropType } from 'vue'
import type { CascaderOption, CascaderBaseValue } from './props'
import { TuBaseIcon } from '../../base-icon'
import TuScrollbar from '../../scrollbar/src/Scrollbar'
import { Tick, ArrowRightRoundSmall } from '../../../icons'
import type { Scrollbar } from '../../../types'
import { useNameScope } from '../../../composables/useNameScope'
import { map } from '../../../utils'
import type Emitter from '../../../utils/emitter'

const CascaderSubmenu = defineComponent({
  name: 'TuCascaderSubmenu',
  props: {
    value: {
      type: [String, Number, null] as PropType<CascaderBaseValue>,
      default: null
    },
    options: Array as PropType<CascaderOption[]>,
    onUpdateValue: Function as PropType<(item: CascaderOption) => void>,
    valueField: {
      type: String as PropType<string>,
      default: 'value' as const
    },
    labelField: {
      type: String as PropType<string>,
      default: 'label' as const
    },
    childrenField: {
      type: String as PropType<string>,
      default: 'children' as const
    },
    disabledField: {
      type: String as PropType<string>,
      default: 'disabled' as const
    },
    emitter: Object as PropType<Emitter>
  },
  emits: ['update:value'],
  setup(props) {
    const ns = useNameScope('cascader-option')
    const scrollbar = ref<Scrollbar | null>(null)
    const selectedIndex = ref<number | null>(null)
    const { labelField, valueField, childrenField, disabledField } = props

    function handleEnter() {
      const container = scrollbar.value?.container
      if (!container || !selectedIndex.value) return
      if (selectedIndex.value > 5) {
        const { offsetHeight: containerHeight } = container
        const top = (selectedIndex.value + 1) * 34 - containerHeight
        scrollbar.value?.scrollTo({ top })
      }
    }

    function handleAfterLeave() {
      selectedIndex.value = null
    }

    props.emitter?.on('onEnter', handleEnter)
    props.emitter?.on('onAfterLeave', handleAfterLeave)

    onBeforeUnmount(() => {
      props.emitter?.off('onEnter', handleEnter)
      props.emitter?.off('onAfterLeave', handleAfterLeave)
    })

    return () => (
      <div class="tu-cascader-submenu">
        <TuScrollbar ref={scrollbar}>
          <div class="tu-cascader-options">
            {map(props.options, (item, index) => {
              if (!item) return null
              if (!item[childrenField] && item[valueField] === props.value) {
                selectedIndex.value = index
              }
              return (
                <div
                  class={[ns.base, {
                    [ns.is('pending')]: item[valueField] === props.value,
                    [ns.is('disabled')]: !!item[disabledField]
                  }]}
                  key={index}
                  onClick={item[disabledField] ? void 0 : () => props.onUpdateValue?.(item)}
                >
                  <div class={ns.el('label')}>{item[labelField]}</div>
                  <div class={ns.el('suffix')}>
                    {(item[childrenField] as CascaderOption[])?.length
                      ? <TuBaseIcon class={[ns.el('icon')]} is={ArrowRightRoundSmall} />
                      : item[valueField] === props.value 
                        ? <TuBaseIcon class={[ns.el('icon'), ns.el('icon--checkmark')]} is={Tick} />
                        : null}
                  </div>
                </div>
              )
            })}
          </div>
        </TuScrollbar>
      </div>
    )
  }
})

export default CascaderSubmenu
