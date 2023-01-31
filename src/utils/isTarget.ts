export function isTarget<T extends HTMLElement, E extends Event>(el: T | null, event: E) {
  return el ? (el === event.target || el.contains(event.target as Node)) : false
}