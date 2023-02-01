import { defaultWindow } from '../configurable'
import { customRef } from 'vue'
import { isClient } from '../utils'
import { tryOnScopeDispose } from './tryOnScopeDispose'

const zIndexKey = Symbol('Maximum z-index')

export interface MaxZIndex extends Window {
  [zIndexKey]: number | undefined,
  elementZIndex: Map<HTMLElement, number>
}

export function useMaxZIndex(initialValue = 2000, window?: Window) {
  const global = defaultWindow as (MaxZIndex | undefined)

  if (isClient && !global?.[zIndexKey]) {
    global![zIndexKey] = initialValue
  }

  function stop() {
    global![zIndexKey] = void 0
  }

  tryOnScopeDispose(stop)

  return customRef(() => ({
    get() {
      return ++global![zIndexKey]!
    },
    set(newValue) {
      global![zIndexKey] = newValue
    }
  }))
}