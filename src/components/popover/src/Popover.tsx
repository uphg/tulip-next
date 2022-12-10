import { defineComponent } from "vue"
import { popoverProps } from "./popoverProps"
import { usePopover } from "./usePopover"

const Popover = defineComponent({
  name: 'TuPopover',
  props: popoverProps,
  emits: ['update:visible'],
  inheritAttrs: false,
  setup(props, context) {
    const { render } = usePopover(props, context)
    return render
  }
})

export default Popover