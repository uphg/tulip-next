export function withAttrs<T extends HTMLElement>(el: T | null | undefined) {
  return el ?? {
    offsetHeight: 0,
    offsetLeft: 0,
    offsetTop: 0,
    offsetWidth: 0,
    scrollTop: 0,
    scrollLeft: 0
  }
}