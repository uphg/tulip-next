import { unref, watch } from 'vue'
import { isArray } from '../utils'
import type { Arrayable, MaybeComputedRef, MaybeElementRef, VueInstance } from '../types'
import { unrefElement } from './unrefElement'

export type UseEventListenerReturn = ReturnType<typeof useEventListener>

export function useEventListener(
  target:  MaybeComputedRef<EventTarget | VueInstance | null | undefined>,
  eventName: Arrayable<string>,
  listener: Arrayable<EventListenerOrEventListenerObject | Function>,
  options?: boolean | AddEventListenerOptions
) {
  const eventNames = isArray(eventName) ? eventName : typeof eventName === 'string' ? [eventName] : []
  const listeners = isArray(listener) ? listener : typeof listener === 'function' ? [listener] : []
  const cleanups: Function[] = []

  const stopWatch = watch(
    () => unrefElement(target as unknown as MaybeElementRef),
    (el: EventTarget) => {
      cleanup()
      if (!el) return

      cleanups.push(
        ...(eventNames as string[]).flatMap((eventName) => {
          return listeners.map(listener => register(el, eventName, listener as EventListenerOrEventListenerObject))
        })
      )
    },
    { immediate: true, flush: 'post' }
  )

  function cleanup() {
    cleanups.forEach(fn => fn())
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

  return stop
}
