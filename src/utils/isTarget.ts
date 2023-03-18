import type { RawElement } from '../types'

export function isTarget<T extends RawElement, E extends Event>(el: T, event: E) {
  return el ? (el === event.target || el.contains(event.target as Node)) : false
}