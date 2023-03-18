import { watch } from 'vue'
import { unrefElement } from './unrefElement'
import { tryOnScopeDispose } from './tryOnScopeDispose'
import { defaultWindow, type ConfigurableWindow } from '../configurable'
import type { MaybeElementRef } from '../types'

interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow { } 
export type useMutationObserverReturn = ReturnType<typeof useMutationObserver>

export function useMutationObserver(
  target: MaybeElementRef,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
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

  tryOnScopeDispose(stop)

  return {
    stop: stop,
    observer
  }
}