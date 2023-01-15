import { isRef, type Ref } from 'vue'
import { defaultWindow, type ConfigurableWindow } from '../configurable'

interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow { } 
type MaybeElement = HTMLElement | SVGElement | undefined | null

export function useMutationObserver(
  _target: MaybeElement | Ref<MaybeElement>,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const target = isRef<MaybeElement>(_target) ? _target.value : _target

  cleanup()

  if (window && target) {
    observer = new MutationObserver(callback)
    observer!.observe(target as HTMLElement, mutationOptions)
  }

  function cleanup() {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  return {
    stop: cleanup,
    observer
  }
}