import { defineComponent } from "vue"
import { popoverProps } from "../../popover/src/popoverProps"
import { usePopover } from "../../popover/src/usePopover"

const Tooltip = defineComponent({
  name: 'TuTooltip',
  props: popoverProps,
  emits: ['update:visible'],
  setup(props, context) {
    const { render } = usePopover(props, context, { className: 'tu-tooltip' })
    return render
  }
})

export default Tooltip
