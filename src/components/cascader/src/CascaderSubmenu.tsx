import { defineComponent, type PropType } from 'vue'
import { TuBaseIcon } from '../../base-icon'
import { Tick, ArrowRightRoundSmall } from '../../../icons'
import type { CascaderOption } from './cascaderProps'
import type { SelectValue } from '../../../types'

const CascaderSubmenu = defineComponent({
  name: 'TuCascaderSubmenu',
  props: {
    value: [String, Number, null] as PropType<SelectValue>,
    options: Array as PropType<CascaderOption[]>,
    onUpdateValue: Function as PropType<(item: CascaderOption) => void>
  },
  emits: ['update:value'],
  setup(props) {
    return () => (
      <div class="tu-cascader-submenu">
        <div class="tu-cascader-options">
          {props.options?.map((item, index) => (
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
          ))}
        </div>
      </div>
    )
  }
})

export default CascaderSubmenu
