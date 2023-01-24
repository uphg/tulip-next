import { unref } from 'vue'
import type { Fn, MaybeComputedRef } from '../types'
import { isFunction } from '../utils'

export function resolveUnref<T>(value: MaybeComputedRef<T>): T {
  return isFunction(value) ? (value as Function)() : unref(value)
}