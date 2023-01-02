import { defineComponent, provide, ref, type ExtractPropTypes, type PropType } from 'vue'
import type { CollapseActiveNames, CollapseItemName, TriggerCollapseItem } from './types'
import { isNil } from '../../../utils'

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseContent = {
  activeNames: CollapseActiveNames,
  triggerCollapseItem: TriggerCollapseItem,
  props: CollapseProps
}

export const collapseInjectionKey = 'tu.collapse'

const collapseProps = {
  active: {
    type: [String, Number, Array] as PropType<CollapseActiveNames>,
    default: ''
  },
  accordion: Boolean as PropType<boolean>
}

const Collapse = defineComponent({
  name: 'TuCollapse',
  props: collapseProps,
  setup(props: CollapseProps, context) {
    const collapse = ref<CollapseContent>({
      activeNames: [],
      triggerCollapseItem,
      props
    })

    function triggerCollapseItem(name: CollapseItemName | undefined) {
      if (isNil(name)) return

      const { activeNames } = collapse.value
      if (props.accordion) {
        collapse.value.activeNames = activeNames === name ? '' : name
      } else {
        const index = (activeNames as CollapseItemName[]).indexOf(name)
        if (index > -1) {
          (activeNames as CollapseItemName[]).splice(index, 1)
        } else {
          (activeNames as CollapseItemName[]).push(name)
        }
      }
    }

    provide(collapseInjectionKey, collapse)

    return () => (
      <div class="tu-collapse">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Collapse
