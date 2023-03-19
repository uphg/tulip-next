import type { RawElement } from '../types'

type ResizeHandler = (entry: ResizeObserverEntry) => void

function createResizeObserverManager() {
  const context = {
    observer: new (window.ResizeObserver)(handleResize),
    elHandlersMap: new Map()
  }
  
  function handleResize(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      const handler = context.elHandlersMap.get(entry.target)
      if (handler !== undefined) {
        handler(entry)
      }
    }
  }
  
  function addHandler<T extends RawElement>(el: T | undefined, handler: ResizeHandler) {
    if (!el) return
    context.elHandlersMap.set(el, handler)
    context.observer.observe(el)
  }
  
  function removeHandler<T extends RawElement>(el: T | undefined) {
    if (!el || !context.elHandlersMap.has(el)) return
    context.elHandlersMap.delete(el)
    context.observer.unobserve(el)
  }

  return {
    observer: context.observer,
    elHandlersMap: context.elHandlersMap,
    addHandler,
    removeHandler
  }
}


export default createResizeObserverManager()