import { isBoolean, toPx } from '../../../utils'
import { computed, defineComponent } from 'vue'
import { sidebarProps } from './props'
import { toCSSValue } from './toCSSValue'

const Sidebar = defineComponent({
  name: 'TuSidebar',
  props: sidebarProps,
  setup(props, context) {
    const width = computed(() => {
      return isBoolean(props.collapsed) && props.collapsed === true
        ? toPx(props.collapsedWidth)
        : toCSSValue(props.width)
    })

    return () => (
      <div class="tu-layout-sidebar" style={{
        '--tu-width': width.value,
        height: toCSSValue(props.height),
        flexDirection: props.flexDirection,
        flexWrap: props.flexWrap,
        flexGrow: props.flexGrow
      }}>
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Sidebar