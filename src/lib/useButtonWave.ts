import { ref, nextTick  } from 'vue';

export function useButtonWave() {
  const isWave = ref(false)
  let animationTimerId: number | null = null

  const onMouseup = () => {
    if (isWave) {
      animationTimerId && window.clearTimeout(animationTimerId)
      isWave.value = false
      animationTimerId = null
    }
    nextTick(() => {
      isWave.value = true
      animationTimerId = window.setTimeout(() => {
        isWave.value = false
        animationTimerId = null
      }, 1000)
    })
  }

  return { isWave, onMouseup }
}