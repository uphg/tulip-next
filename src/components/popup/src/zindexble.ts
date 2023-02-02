const zindexable = {
  nextZIndex: 2000,
  elementZIndex: new Map<HTMLElement, number>(),
}

export function cumulativeZIndex(el: HTMLElement) {
  zindexable.nextZIndex = zindexable.nextZIndex + 1
  zindexable.elementZIndex.set(el, zindexable.nextZIndex)
  el.style.zIndex = String(zindexable.nextZIndex)
}

export function updateZIndex(el: HTMLElement) {
  const prevZIndex = zindexable.elementZIndex.get(el)
  if (prevZIndex) {
    prevZIndex < zindexable.nextZIndex ? cumulativeZIndex(el) : zindexable.nextZIndex = prevZIndex
  } else {
    cumulativeZIndex(el)
  }
}

export default zindexable