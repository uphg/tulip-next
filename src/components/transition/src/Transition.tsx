import { defineComponent, Transition } from "vue";

const baseTransition = defineComponent({
  name: 'TuTransition',
  setup(_props, context) {
    return () => (
      <Transition name="tu-fade" mode="out-in">
        {context.slots.default?.()}
      </Transition>
    )
  }
})

export default baseTransition
