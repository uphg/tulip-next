import { onMounted } from 'vue'
import { unrefElement } from './unrefElement'
import { tryOnScopeDispose } from './tryOnScopeDispose'
import resizeObserverManager from '../utils/resizeObserverManager'
import type { MaybeElementRef } from '../types'

export function useResize(target: MaybeElementRef, onResize: (() => void) | undefined) {
  if (!onResize) return

  onMounted(() => {
    const el = unrefElement(target)
    if (!el) return 
    resizeObserverManager?.addHandler(el, onResize)
  })

  tryOnScopeDispose(() => {
    const el = unrefElement(target)
    if (!el) return
    resizeObserverManager?.removeHandler(unrefElement(target))
  })
}
