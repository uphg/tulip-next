import { isFlattenable } from './isFlattenable'
import { baseFlattenDeep } from './baseFlattenDeep'

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

export function baseFlatten<T>(array: RecursiveArray<T>, callback: Function, isDeep = false) {
  const length = array?.length || 0
  const result = []
  for (let i = 0; i < length; i++) {
    const item = callback(array[i], i, array)
    if (isFlattenable(item)) {
      isDeep ? result.push(...baseFlattenDeep(item)) : result.push(...item)
    } else {
      result.push(item)
    }
  }
  return result
}
