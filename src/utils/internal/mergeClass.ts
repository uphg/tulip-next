import { splitClass } from './splitClass'
import { flatMap } from '../flatMap'
import { isArray } from '../isArray'

export function mergeClass(args: string[] | string[][]) {
  const result = flatMap(args as string[], (item) => {
    return isArray(item) ? flatMap(item, (names: string) => splitClass(names)) : splitClass(item)
  })
  return result
}
