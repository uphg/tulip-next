import { defineComponent, ref, Transition } from 'vue'

const TestTransition = defineComponent({
  setup() {
    const visible = ref(false)
    return () => (
      <div>
        <button onClick={() => visible.value = !visible.value}>点击渐变</button>
        <Transition name="tu-fade">
          {{
            default: () => (
              visible.value ? <div class="hi" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>我是渐变内容</div>: null
            )
          }}
        </Transition>
      </div>
    )
  }
})

export default TestTransition