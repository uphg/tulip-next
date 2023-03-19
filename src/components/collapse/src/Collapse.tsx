import { defineComponent, provide, type ExtractPropTypes, type PropType } from 'vue'
import type { CollapseItemName } from './types'
import { isNil, remove } from '../../../utils'
import { useCachedValue } from '../../../composables/useCachedValue'

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseInjectionKey = 'tu.collapse'

const collapseProps = {
  activeNames: [String, Number, Array, null] as PropType<string | number | Array<string | number> | null>,
  accordion: Boolean as PropType<boolean>
}

const Collapse = defineComponent({
  name: 'TuCollapse',
  props: collapseProps,
  emits: ['update:activeNames'],
  setup(props: CollapseProps, context) {
    const activeNames = useCachedValue(props, 'activeNames', { context, defaultValue: props.accordion ? null : [] })

    function triggerCollapseItem(name?: CollapseItemName) {
      if (isNil(name)) return

      if (props.accordion) {
        activeNames.value = activeNames.value === name ? null : name
      } else {
        const prevNames = (activeNames.value as CollapseItemName[])
        const index = prevNames.indexOf(name)

        if (index > -1) {
          activeNames.value = remove(prevNames, (_, i) => i === index)
        } else {
          activeNames.value = [...prevNames, name]
        }
      }
    }

    provide(collapseInjectionKey, {
      activeNames: activeNames,
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
