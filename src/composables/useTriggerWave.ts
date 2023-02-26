import { ref, nextTick, shallowRef } from 'vue'
import type { Ref } from 'vue'

export function useTriggerWave() {
  const isWave: Ref<boolean> = ref(false)
  const selfRef = shallowRef<HTMLElement | null>(null)
  let animationTimerId: number | null = null

  const stop = () => {
    isWave.value = false
    typeof animationTimerId === 'number' && window.clearTimeout(animationTimerId)
    animationTimerId = null
  }

  const triggerWave = () => {
    if (isWave.value) {
      stop()
    }
    nextTick(() => {
      // 刷新 DOM
      void selfRef.value?.offsetHeight
      isWave.value = true
      animationTimerId = window.setTimeout(() => {
        stop()
      }, 1000)
    })
  }

  return { isWave, triggerWave, selfRef }
}
