import { isBoolean, toPx } from '../../../utils'
import { computed, defineComponent, type StyleValue } from 'vue'
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

    const style = computed(() => ({
      '--tu-width': width.value,
      height: toCSSValue(props.height),
      flexDirection: props.direction,
      flexWrap: props.wrap ? 'wrap' : 'nowrap',
      flexGrow: props.grow
    }) as StyleValue)

    return () => (
      <div class="tu-layout-sidebar" style={style.value}>
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Sidebar