import { defineComponent, ref, type PropType } from 'vue'
import { useDraggable } from '../../../composables/useDraggable'
import type { MaybeElement, Position } from '../../../types'

const draggableProps = {
  initialValue: Object as PropType<Position>,
  draggingElement: Object as PropType<MaybeElement>
}

const Draggable = defineComponent({
  name: 'TuDraggable',
  props: draggableProps,
  setup(props, context) {
    const drag = ref<HTMLElement | null>(null)
    const { x, y, style } = useDraggable(drag, props)

    return () => (
      <div ref={drag} class="tu-draggable" style={{ touchAction: 'none', ...style.value }}>
        {context.slots.default?.({ x, y })}
      </div>
    )
  }
})

export default Draggable