import { defineComponent } from 'vue'
import { popoverProps } from './props'
import { usePopover } from './usePopover'

const Popover = defineComponent({
  name: 'TuPopover',
  props: popoverProps,
  emits: ['update:visible'],
  inheritAttrs: false,
  setup(props, context) {
    return usePopover(props, context)
  }
})


export default Popover