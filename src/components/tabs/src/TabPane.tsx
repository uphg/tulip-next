import { defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import { TAGKEY } from '../../../shared'
import type { TabsValue } from './Tabs'

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export const tabPaneProps = {
  name: {
    type: [String, Number] as PropType<TabsValue>,
    default: void 0
  },
  label: {
    type: [String, Number] as PropType<string | number>,
    default: void 0
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
