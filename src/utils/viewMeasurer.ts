let el: HTMLElement | null = null

export function ensureViewBoundingRect() {
  if (!el) {
    el = document.createElement('div')
    el.id = 'tu-view-measurer'
    el.setAttribute('style', 'position: fixed; inset: 0px; pointer-events: none; visibility: hidden;')
    document.body.appendChild(el)
  }

  return el.getBoundingClientRect()
}
