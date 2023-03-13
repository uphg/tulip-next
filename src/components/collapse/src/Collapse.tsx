import { defineComponent, provide, ref, watch, type ExtractPropTypes, type PropType, type Ref } from 'vue'
import type { CollapseItemName } from './types'
import { isNil, remove } from '../../../utils'

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseInjectionKey = 'tu.collapse'

const collapseProps = {
  activeNames: {
    type: [String, Number, Array, null] as PropType<string | number | Array<string | number> | null>,
    default: null
  },
  accordion: Boolean as PropType<boolean>
}

const Collapse = defineComponent({
  name: 'TuCollapse',
  props: collapseProps,
  emits: ['update:activeNames'],
  setup(props: CollapseProps, context) {
    const _activeNames = ref<CollapseProps['activeNames']>(props.accordion ? null : [])

    watch(_activeNames, (newValue) => {
      context.emit('update:activeNames', props.accordion ? newValue : [...newValue])
    })

    function triggerCollapseItem(name: CollapseItemName | undefined) {
      if (isNil(name)) return

      if (props.accordion) {
        _activeNames.value = _activeNames.value === name ? null : name
      } else {
        const activeNames = (_activeNames.value as CollapseItemName[])
        const index = activeNames.indexOf(name)
        if (index > -1) {
          (_activeNames.value as CollapseItemName[]).splice(index, 1)
        } else {
          (_activeNames.value as CollapseItemName[]).push(name)
        }
      }
    }

    provide(collapseInjectionKey, {
      activeNames: _activeNames,
      triggerCollapseItem,
      props
    })

    return () => (
      <div class="tu-collapse">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Collapse
