import { ref, nextTick, Ref  } from 'vue';

export function useButtonWave() {
  const isWave: Ref<boolean> = ref(false)
  let animationTimerId: number | null = null

  const closeTimeout = () => {
    isWave.value = false
    typeof animationTimerId  === 'number' && window.clearTimeout(animationTimerId)
    animationTimerId = null
  }

  const triggerWave = () => {
    if (isWave.value) {
      closeTimeout()
    }
    nextTick(() => {
      isWave.value = true
      animationTimerId = window.setTimeout(() => {
        closeTimeout()
      }, 1000)
    })
  }

  return { isWave, triggerWave }
}