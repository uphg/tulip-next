import type { EventHandler } from '../types'

const delegateHandler = Symbol('delegateHandler')

export interface EventDelegHandler {
  (e: Event, target?: EventTarget): unknown
  [delegateHandler]?: EventListenerOrEventListenerObject
}

export type EventDelegOptions = boolean | EventListenerOptions | undefined
export type EventDelegElement = Element | Document | Window

export function on<T extends EventDelegElement>(
  el: T,
  eventName: string,
  selector: string | EventHandler<T>,
  handler?: EventHandler<T> | EventDelegOptions,
  options?: EventDelegOptions
) {
  if (!el || !eventName || !selector) return

  if (isFunction(selector)) {
    el.addEventListener(eventName, selector, handler as EventDelegOptions)
  } else if (isFunction(handler)) {
    const listener = (event: Event) => {
      let { target } = event
      while (!(target as Element)?.matches(selector)) {
        if (el === target) {
          target = null
          break
        }
        target = (target as Node)?.parentNode
      }
      target && (handler as EventDelegHandler).call(target, event)
    }
    (handler as EventDelegHandler)[delegateHandler] = listener
    el.addEventListener(eventName, listener, options)
  }

  return el
}

export function off<T extends EventDelegElement>(
  el: T,
  eventName: string,
  handler: EventHandler<T>,
  options?: EventDelegOptions
) {
  if (!el || !eventName || !handler) return

  el.removeEventListener(eventName, handler, options)
  const deleg = (handler as EventDelegHandler)?.[delegateHandler]
  deleg && el.removeEventListener(eventName, deleg, options)

  return el
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}
