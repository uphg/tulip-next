import type { Fn } from '../types'
import { isFunction } from './isFunction'

export function delay(fn: Fn, wait: number, args?: unknown[]) {
  if (!isFunction(fn)) {
    throw new TypeError('Expected a function')
  }

  return setTimeout(fn, wait, ...args!)
}