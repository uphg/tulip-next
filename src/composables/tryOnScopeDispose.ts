import { getCurrentScope, onScopeDispose } from 'vue'
import type { Fn } from '../types'

export function tryOnScopeDispose(fn: Fn) {
  return getCurrentScope() ? (onScopeDispose(fn), true) : false 
}
