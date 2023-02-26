import { isClient } from './isClient'

let scrollbarWidth: number | null = null
let _devicePixelRatio: number | null = null

if (isClient) {
  window.addEventListener('resize', () => {
    // 页面缩放
    if (_devicePixelRatio !== window.devicePixelRatio) {
      _devicePixelRatio = window.devicePixelRatio
      scrollbarWidth = null
    }
  })
}

export function getScrollbarWidth() {
  if (scrollbarWidth === null) {
    if (typeof document === 'undefined') {
      scrollbarWidth = 0
      return scrollbarWidth
    }

    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.style.left = '0'
    div.style.visibility = 'hidden'
    div.style.overflowY = 'scroll'
    document.body.appendChild(div)
    const width = div.getBoundingClientRect().right
    document.body.removeChild(div)
    scrollbarWidth = width
  }

  return scrollbarWidth
}
