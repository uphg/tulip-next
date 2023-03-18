import { watch } from 'vue'
import { defaultWindow, type ConfigurableWindow } from '../configurable'
import { tryOnScopeDispose } from './tryOnScopeDispose'
import { unrefElement, type MaybeComputedElementRef } from './unrefElement'

export interface UseResizeObserverOptions extends ResizeObserverOptions, ConfigurableWindow { } 
export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>

export function useResizeObserver(
  target: MaybeComputedElementRef,
  callback: ResizeObserverCallback,
  options: UseResizeObserverOptions = {},
) {
  const { window = defaultWindow, ...observerOptions } = options
  let observer: ResizeObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = void 0
    }
  }

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup()

      if (window && el) {
        observer = new ResizeObserver(callback)
        observer!.observe(el, observerOptions)
      }
    },
    // Vue 更新后在 watch 回调中访问 DOM（默认 watch 在 Vue 组件更新之前调用）
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return {
    stop,
  }
}