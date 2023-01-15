import { isRef, watch, type ComponentPublicInstance, type Ref } from 'vue'

interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}

interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow { } 
type MaybeElement = HTMLElement | SVGElement | undefined | null
const isClient = typeof window !== 'undefined'
const defaultWindow = isClient ? window : undefined

export function useMutationObserver(
  _target: MaybeElement | Ref<MaybeElement>,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const target = isRef<MaybeElement>(_target) ? _target.value : _target

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(
    () => target,
    (el: MaybeElement) => {

      cleanup()

      if (window && el) {
        observer = new MutationObserver(callback)
        observer!.observe(el as HTMLElement, mutationOptions)
      }
    },
    { immediate: true },
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  return {
    stop
  }
}