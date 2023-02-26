import { defineComponent, onBeforeUnmount, ref, type PropType } from 'vue'
import type { CascaderOption } from './cascaderProps'
import { TuBaseIcon } from '../../base-icon'
import TuScrollbar from '../../scrollbar/src/Scrollbar'
import { Tick, ArrowRightRoundSmall } from '../../../icons'
import type { SelectValue, Scrollbar } from '../../../types'
import { useNameScope } from '../../../composables/useNameScope'
import { withAttrs } from '../../../utils'
import type Emitter from '../../../utils/emitter'

const CascaderSubmenu = defineComponent({
  name: 'TuCascaderSubmenu',
  props: {
    value: [String, Number, null] as PropType<SelectValue>,
    options: Array as PropType<CascaderOption[]>,
    onUpdateValue: Function as PropType<(item: CascaderOption) => void>,
    emitter: Object as PropType<Emitter>
  },
  emits: ['update:value'],
  setup(props) {
    const ns = useNameScope('cascader-option')
    const scrollbar = ref<Scrollbar | null>(null)
    const selectedIndex = ref<number | null>(null)

    function handleEnter() {
      if (selectedIndex.value && selectedIndex.value > 5) {
        const container = scrollbar.value?.container
        const { offsetHeight: containerHeight } = withAttrs(container)
        const height = (selectedIndex.value) * 34 - containerHeight
        scrollbar.value?.scrollTo({ top: height })
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
            {props.options?.map((item, index) => {
              if (!item) return null
              if (!item.children && item.value === props.value) {
                selectedIndex.value = index
              }
              return (
                <div
                  class={[ns.base, {
                    [ns.is('pending')]: props.value === item.value,
                    [ns.is('disabled')]: !!item.disabled
                  }]}
                  key={index}
                  onClick={item.disabled ? void 0 : () => props.onUpdateValue?.(item)}
                >
                  <div class={ns.el('label')}>{item.label}</div>
                  <div class={ns.el('suffix')}>
                    {item.children?.length
                      ? <TuBaseIcon class={[ns.el('icon')]} is={ArrowRightRoundSmall} />
                      : item.value === props.value
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
