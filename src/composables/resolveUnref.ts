import { unref } from 'vue'
import type { MaybeComputedRef } from '../types'

export function resolveUnref<T>(value: MaybeComputedRef<T>): T {
  return typeof value === 'function' ? (value as Function)() : unref(value)
}