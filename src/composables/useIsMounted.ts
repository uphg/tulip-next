import { ref, onMounted, readonly } from 'vue'

export function useIsMounted() {
  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })
  return readonly(isMounted)
}
