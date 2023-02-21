import { defineComponent } from 'vue'

const InputGroup = defineComponent({
  name: 'TuInputGroup',
  inheritAttrs: false,
  setup(_props, context) {
    return () => (
      <div class="tu-input-group">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default InputGroup
