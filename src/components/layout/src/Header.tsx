import { defineComponent } from 'vue'
import { headerProps } from './props'
import { toCSSValue } from './toCSSValue'

const Header = defineComponent({
  name: 'TuHeader',
  props: headerProps,
  setup(props, context) {
    return () => (
      <div class="tu-layout-header" style={{
        width: toCSSValue(props.width),
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

export default Header