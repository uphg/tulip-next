const scrollableValues = ['visible', 'scroll', 'auto']

export function disableBodyScrolling() {
  const dom = document.documentElement
  const finalStyle = getComputedStyle(dom, null)
  if (scrollableValues.includes(finalStyle.overflow)) {
    dom.setAttribute('data-old-overflow', scrollableValues.includes(dom.style.overflow) ? dom.style.overflow : '')
    dom.style.overflow = 'hidden'
  }
}

export function enableBodyScrolling() {
  const dom = document.documentElement
  const overflow = dom.getAttribute('data-old-overflow')
  dom.style.overflow = overflow || ''
}