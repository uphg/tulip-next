import { defineComponent, inject, ref, type PropType } from 'vue'
import { TuBaseIcon } from '../../base-icon'
import { Tick, ArrowRightRoundSmall } from '../../../icons'
import type { CascaderOption } from './cascaderProps'
import type { SelectValue, Scrollbar } from '../../../types'
import TuScrollbar from '../../scrollbar/src/Scrollbar'
import type Emitter from '../../../utils/emitter'
import { withAttrs } from '../../../utils'

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
    const scrollbar = ref<Scrollbar | null>(null)
    const selectedIndex = ref<number | null>(null)

    function onEnter() {
      if (selectedIndex.value && selectedIndex.value > 5) {
        const container = scrollbar.value?.container
        const { offsetHeight: containerHeight } = withAttrs(container)
        const height = (selectedIndex.value + 1) * 34 - containerHeight
        scrollbar.value?.scrollTo({ top: height })
      }
    }

    function onAfterLeave() {
      selectedIndex.value = null
    }

    props.emitter?.on('onEnter', onEnter)
    props.emitter?.on('onAfterLeave', onAfterLeave)

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
                  class={['tu-cascader-option', {
                    'tu-cascader-option--pending': props.value === item.value,
                    'tu-cascader-option--disabled': !!item.disabled
                  }]}
                  key={index}
                  onClick={item.disabled ? void 0 : () => props.onUpdateValue?.(item)}
                >
                  <div class="tu-cascader-option__label">{item.label}</div>
                  <div class="tu-cascader-option__suffix">
                    {item.children?.length
                      ? <TuBaseIcon class="tu-cascader-option__icon" is={ArrowRightRoundSmall} />
                      : item.value === props.value
                        ? <TuBaseIcon class="tu-cascader-option__icon tu-cascader-option__icon--checkmark" is={Tick} />
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
