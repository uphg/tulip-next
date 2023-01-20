import { isRef, watch, type Ref } from 'vue'
import { defaultWindow, type ConfigurableWindow } from '../configurable'

interface UseResizeObserverOptions extends ResizeObserverOptions, ConfigurableWindow { } 
type MaybeElement = HTMLElement | SVGElement | undefined | null

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>

export function useResizeObserver(
  _target: MaybeElement | Ref<MaybeElement>,
  callback: ResizeObserverCallback,
  options: UseResizeObserverOptions = {},
) {
  const { window = defaultWindow, ...observerOptions } = options
  let observer: ResizeObserver | undefined
  const target = isRef<MaybeElement>(_target) ? _target.value : _target

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = void 0
    }
  }

  const stopWatch = watch(
    () => target,
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

  return {
    stop,
  }
}