import { defineComponent } from 'vue'
import { scrollbarProps } from './scrollbarProps'
import { useScrollbar } from './useScrollbar'

const Scrollbar = defineComponent({
  name: 'TuScrollbar',
  props: scrollbarProps,
  setup(props, context) {
    return useScrollbar(props, context)
  }
})

export default Scrollbar
