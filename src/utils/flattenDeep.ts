import { baseFlatten } from './internal/baseFlatten'

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

export function flattenDeep<T>(array: RecursiveArray<T>): T[] {
  return array?.length ? baseFlatten<T>(array, (item: T) => item, true) : []
}
