import { baseFlatten } from './internal/baseFlatten'

export function flatten<T>(array: T[]) {
  return array?.length ? baseFlatten<T>(array, (item: T) => item) : []
}
