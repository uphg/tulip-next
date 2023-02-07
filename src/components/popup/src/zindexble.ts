const context = {
  nextZIndex: 2000,
  elementZIndex: new Map<HTMLElement, number>(),
}

export function cumulativeZIndex(el: HTMLElement) {
  context.nextZIndex = context.nextZIndex + 1
  context.elementZIndex.set(el, context.nextZIndex)
  el.style.zIndex = String(context.nextZIndex)
}

export function updateZIndex(el: HTMLElement) {
  const prevZIndex = context.elementZIndex.get(el)
  if (prevZIndex) {
    prevZIndex < context.nextZIndex ? cumulativeZIndex(el) : context.nextZIndex = prevZIndex
  } else {
    cumulativeZIndex(el)
  }
}

export default context
