import { defineComponent, provide, ref } from "vue";

const collapseProps = {

}

type CollapseItemStatus = { name: string | number, active: boolean } | {}
type CollapseItems = CollapseItemStatus[]
type SetCollapseItems = (index: number, value: CollapseItemStatus) => void 

const Collapse = defineComponent({
  name: 'TuCollapse',
  props: collapseProps,
  setup(props, context) {
    const collapseItems = ref<CollapseItems>([])

    function setCollapseItems(index: number, value: CollapseItemStatus) {
      if (!collapseItems.value[index]) {
        collapseItems.value[index] = {}
      }
      Object.assign(collapseItems.value[index], value)
    }

    provide('collapseItems', collapseItems)
    provide('setCollapseItems', setCollapseItems)

    return () => (
      <div class="tu-collapse">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Collapse
