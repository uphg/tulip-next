import { TAGKEY } from '../shared'
import isObject from './isObject'
import type { VNodeTypes } from 'vue'

export function renderComponent<T extends { type: VNodeTypes }>(array: T[] | undefined, tag: string): T[] {
  const length = array?.length
  if (!length) return []
  const result: T[] = [] 
  let index = -1

  while (++index < length) {
    const item = array[index]
    const type = item.type as { [TAGKEY]: string }
    if (isObject(type) && type[TAGKEY] === tag) {
      result.push(item)
    }
  }

  return result
}