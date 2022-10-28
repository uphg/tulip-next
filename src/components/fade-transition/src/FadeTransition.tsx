import { defineComponent, Transition } from "vue";

const FadeTransition = defineComponent({
  name: 'FadeTransition',
  setup() {
    return () => (
      <Transition name="tu-component-fade" mode="out-in">
        <slot />
      </Transition>
    )
  }
})

export default FadeTransition
