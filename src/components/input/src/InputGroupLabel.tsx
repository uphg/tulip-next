import { defineComponent } from "vue";

const InputGroupLabel = defineComponent({
  name: 'TuInputGroupLabel',
  inheritAttrs: false,
  setup(_props, context) {
    return () => (
      <div class="tu-input-group-label">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default InputGroupLabel
