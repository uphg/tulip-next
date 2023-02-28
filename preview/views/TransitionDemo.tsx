import { defineComponent, ref, Transition } from 'vue'
import Hello from './Hello.vue'

const TransitionDemo = defineComponent({
  name: 'TransitionDemo',
  setup() {
    const visible = ref(false)
    return () => [
      <button onClick={() => visible.value = !visible.value}>点击切换</button>,
      <Transition name="fade" mode="out-in">
        {visible.value ? <span>hi</span> : <span>hello</span>}
      </Transition>,
      <Transition name="fade" mode="out-in">
        {visible.value ? <Hello>嗨</Hello> : <Hello>你好</Hello>}
      </Transition>
    ]
  }
})

export default TransitionDemo