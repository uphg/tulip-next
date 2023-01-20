import { isRef, watch, type Ref } from 'vue'
import { defaultWindow, type ConfigurableWindow } from '../configurable'

interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow { } 
type MaybeElement = HTMLElement | SVGElement | undefined | null

export type useMutationObserverReturn = ReturnType<typeof useMutationObserver>

export function useMutationObserver(
  _target: MaybeElement | Ref<MaybeElement>,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const target = isRef<MaybeElement>(_target) ? _target.value : _target

  const stopWatch = watch(
    () => target,
    (el: MaybeElement) => {
      cleanup()

      if (window && el) {
        observer = new MutationObserver(callback)
        observer.observe(el, mutationOptions)
      }
    },
    { immediate: true }
  )

  function cleanup() {
    if (observer) {
      observer.disconnect()
      observer = void 0
    }
  }

  function stop() {
    cleanup()
    stopWatch()
  }

  return {
    stop: stop,
    observer
  }
}