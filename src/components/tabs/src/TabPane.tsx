import { defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import { TAGKEY } from '../../../shared'

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export const tabPaneProps = {
  name: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: null
  },
  label: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: null
  }
}

const TabPane = defineComponent({
  name: 'TuTabPane',
  props: tabPaneProps,
  [TAGKEY]: 'TabPane',
  setup(_props, context) {
    return () => (
      <div class="tu-tab-pane">{context.slots.default?.()}</div>
    )
  }
})

export default TabPane
