import { watch } from 'vue'
import { unrefElement } from './unrefElement'
import { tryOnScopeDispose } from './tryOnScopeDispose'
import { isArray, flatMap } from '../utils'
import type { Arrayable, Fn, MaybeElementRef } from '../types'

export type UseEventListenerReturn = ReturnType<typeof useEventListener>

export function useEventListener(
  target: MaybeElementRef,
  eventName: Arrayable<string>,
  listener: Arrayable<EventListenerOrEventListenerObject | Function>,
  options?: boolean | AddEventListenerOptions
) {
  const eventNames = isArray(eventName) ? eventName : typeof eventName === 'string' ? [eventName] : []
  const listeners = isArray(listener) ? listener : typeof listener === 'function' ? [listener] : []
  const cleanups: unknown[] = []

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup()
      if (!el) return
      cleanups.push(
        ...flatMap(eventNames, (eventName) => {
          return listeners.map(listener => register(el, eventName, listener as Fn))
        })
      )
    },
    { immediate: true, flush: 'post' }
  )

  function cleanup() {
    if (!cleanups.length) return
    (cleanups as Fn[]).forEach(fn => fn?.())
    cleanups.length = 0
  }

  function register(el: EventTarget, event: string, listener: EventListenerOrEventListenerObject) {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  function stop() {
    stopWatch()
    cleanup()
  }

  tryOnScopeDispose(stop)

  return stop
}
