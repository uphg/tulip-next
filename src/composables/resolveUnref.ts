import { unref } from 'vue'
import { isFunction } from '../utils'
import type { MaybeComputedRef } from '../types'

export function resolveUnref<T>(value: MaybeComputedRef<T>): T {
  return isFunction(value) ? (value as Function)() : unref(value)
}