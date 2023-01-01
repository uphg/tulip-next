import { isArray, isNil } from '../../../utils'
import { computed, defineComponent, provide, readonly, ref, type PropType } from 'vue'

export type ActiveName = string | number | (string | number)[]

const collapseProps = {
  active: {
    type: [String, Number, Array] as PropType<ActiveName>,
    default: ''
  },
  accordion: Boolean as PropType<boolean>
}

const Collapse = defineComponent({
  name: 'TuCollapse',
  props: collapseProps,
  setup(props, context) {
    const activeNames = ref<ActiveName>([])
    
    const onClickCollapseItem = (activeName: string | number) => {
      if (isNil(activeName)) return

      if (props.accordion) {
        activeNames.value = activeName
      } else {
        const index = (activeNames?.value as (string | number)[]).indexOf(activeName)
        if (index > -1) {
          (activeNames.value as (string | number)[]).splice(index, 1)
        } else {
          (activeNames.value as (string | number)[]).push(activeName)
        }
      }
    }

    provide('activeNames', readonly(activeNames))
    provide('onClickCollapseItem', onClickCollapseItem)
    return () => (
      <div class="tu-collapse">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Collapse
