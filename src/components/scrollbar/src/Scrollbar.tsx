import { defineComponent, type PropType } from 'vue'

const scrollbarProps = {
  directionY: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  directionX: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

const Scrollbar = defineComponent({
  name: 'TuScrollbar',
  props: scrollbarProps,
  setup(props, context) {

    return () => (
      <div class={['tu-scrollbar', { 'tu-scrollbar--direction-x': props.directionX }]}>
        <div class={['tu-scrollbar-container', context.attrs.class]}>
          <div class="tu-scrollbar-content">{context.slots.default?.()}</div>
        </div>
        {props.directionY ? <div class="tu-scrollbar-rail tu-scrollbar-rail--vertical"></div> : null }
        {props.directionX ? <div class="tu-scrollbar-rail tu-scrollbar-rail--horizontal"></div> : null}
      </div>
    )
  }
})

export default Scrollbar
