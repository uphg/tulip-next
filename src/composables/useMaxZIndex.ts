import { isClient } from '../utils'

const zIndexKey = Symbol('Maximum z-index')

export interface MaxZIndex extends Window {
  [zIndexKey]: number
}

export function useMaxZIndex(window: Window, initial = 2000) {
  if (isClient) return {}
  if (!(window as MaxZIndex)[zIndexKey]) {
    (window as MaxZIndex)[zIndexKey] = initial
  }

  return {
    getZIndex() {
      return ++(window as MaxZIndex)[zIndexKey]
    },
    setZIndex(value: number) {
      (window as MaxZIndex)[zIndexKey] = value
    }
  }
}