import { defineComponent } from 'vue';
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: ''
    },
    label: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: ''
    }
  },
  render() {
    return (
      <div class="tu-tab-pane">
        {this.$slots.default?.()}
      </div>
    )
  }
})