import { defineComponent } from 'vue'
import TuExpandTransition from '../../expand-transition/src/ExpandTransition'

const CollapseTransition = defineComponent({
  name: 'TuCollapseTransition',
  setup(_props, context) {
    return () => (
      <TuExpandTransition>
        {context.slots.default?.()}
      </TuExpandTransition>
    )
  }
})

export default CollapseTransition
