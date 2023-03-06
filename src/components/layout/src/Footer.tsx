import { defineComponent } from 'vue'
import { footerProps } from './props'
import { toCSSValue } from './toCSSValue'

const Footer = defineComponent({
  name: 'TuFooter',
  props: footerProps,
  setup(props, context) {
    return () => (
      <div class="tu-layout-footer" style={{
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

export default Footer