import type { MaybeElementRef } from '../types'
import { isRef, watch } from 'vue'
import { defaultWindow, type ConfigurableWindow } from '../configurable'
import { unrefElement } from './unrefElement'

interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow { } 
type MaybeElement = HTMLElement | SVGElement | undefined | null

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
    (el: Element | undefined) => {
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