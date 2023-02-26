import { addClass, removeClass } from './dom'
let scrollbarWidth: number | null

export function disableBodyScroll() {
  const { body } = document
  scrollbarWidth = window.innerWidth - body.offsetWidth
  if (scrollbarWidth > 0) {
    body.style.setProperty('--tu-scrollbar-width', `${scrollbarWidth}px`)
    addClass(body, 'tu-disable-scrolling')
  }
}

export function enableBodyScroll() {
  if (!scrollbarWidth) return
  removeClass(document.body, 'tu-disable-scrolling')
  scrollbarWidth = null
}
