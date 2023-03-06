import { defineComponent } from 'vue'
import { contentProps } from './props'
import { toCSSValue } from './toCSSValue'

const Content = defineComponent({
  name: 'TuContent',
  props: contentProps,
  setup(props, context) {
    return () => (
      <div class="tu-layout-content" style={{
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

export default Content