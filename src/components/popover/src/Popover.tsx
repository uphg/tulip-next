import { defineComponent } from "vue"
import { popoverProps } from "./popoverProps"
import { usePopover } from "./usePopover"

const Popover = defineComponent({
  name: 'TuPopover',
  props: popoverProps,
  setup(props, context) {
    return usePopover(props, context)
  }
})

export default Popover