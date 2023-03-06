import { useNameScope } from '../../../composables/useNameScope'
import { defineComponent, type PropType } from 'vue'
import { layoutProps } from './props'
import { toCSSValue } from './toCSSValue'

const Layout = defineComponent({
  name: 'TuLayout',
  props: layoutProps,
  setup(props, context) {
    return () => (
      <div class="tu-layout" style={{
        width: toCSSValue(props.width),
        height: toCSSValue(props.height),
        flexDirection: props.flexDirection,
        flexWrap: props.flexWrap,
        flexGrow: props.flexGrow,
      }}>
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Layout