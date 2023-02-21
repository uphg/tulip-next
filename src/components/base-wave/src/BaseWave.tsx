import { defineComponent, ref, nextTick, computed, type PropType, shallowRef } from 'vue'
import type { Ref } from 'vue'

const baseWaveProps = {
  size: {
    type: String as PropType<'medium' | 'large'>,
    default: 'medium'
  }
}

const BaseWave = defineComponent({
  name: 'TuBaseWave',
  props: baseWaveProps,
  setup(props, context) {
    const wave = shallowRef<HTMLElement | null>(null)
    const isActive = ref(false)
    const activeClass = computed(() => props.size === 'large' ? 'tu-base-wave--big-active' : 'tu-base-wave--active')
    let timerId: number | null = null

    function stop() {
      isActive.value = false
      typeof timerId === 'number' && window.clearTimeout(timerId)
      timerId = null
    }

    function triggerWave() {
      if (isActive.value) {
        stop()
      }
      nextTick(() => {
        void wave.value?.offsetHeight
        isActive.value = true
        timerId = window.setTimeout(stop, 1000)
      })
    }

    context.expose({ triggerWave })
    return () => (
      <span ref={wave} class={['tu-base-wave', { [activeClass.value]: isActive.value }]}/>
    )
  }
})

export default BaseWave