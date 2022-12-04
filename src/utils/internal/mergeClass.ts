import { splitClass } from './splitClass'
import { flatMap } from '../flatMap'
import { isArray } from '../isArray'

export function mergeClass(args: string[] | string[][]) {
  const result = flatMap<string | string[]>(args, (item: string | string[]) => {
    return isArray(item) ? flatMap(item, (names: string) => splitClass(names)) : splitClass(item)
  })
  return result
}
