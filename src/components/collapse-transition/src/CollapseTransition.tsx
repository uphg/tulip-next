import { defineComponent, type PropType } from 'vue'
import TuExpandTransition from '../../expand-transition/src/ExpandTransition'

const CollapseTransition = defineComponent({
  name: 'TuCollapseTransition',
  props: {
    withWidth: Boolean as PropType<boolean>
  },
  setup(props, context) {
    return () => (
      <TuExpandTransition withWidth={props.withWidth}>
        {context.slots.default?.()}
      </TuExpandTransition>
    )
  }
})

export default CollapseTransition
