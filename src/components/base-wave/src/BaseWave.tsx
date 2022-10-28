import { defineComponent, ref, nextTick, computed, type PropType } from 'vue'
import type { Ref } from 'vue'

const baseWaveProps = {
  size: {
    type: String as PropType<'medium' | 'large'>,
    default: 'medium'
  }
}

const BaseWave = defineComponent({
  props: baseWaveProps,
  setup(props, context) {
    const isActive: Ref<boolean> = ref(false)
    const selfRef = ref<HTMLElement | null>(null)
    const activeClass = computed(() => props.size === 'large' ? 'tu-base-wave--big-active' : 'tu-base-wave--active')
    let animationTimerId: number | null = null

    const destroyTimeout = () => {
      isActive.value = false
      typeof animationTimerId === 'number' && window.clearTimeout(animationTimerId)
      animationTimerId = null
    }

    const triggerWave = () => {
      if (isActive.value) { destroyTimeout() }
      nextTick(() => {
        void selfRef.value?.offsetHeight
        isActive.value = true
        animationTimerId = window.setTimeout(() => {
          destroyTimeout()
        }, 1000)
      })
    }

    context.expose({ triggerWave })
    return () => (
      <span
        ref={selfRef}
        class={['tu-base-wave', { [activeClass.value]: isActive.value }]}
      />
    )
  }
})

export default BaseWave