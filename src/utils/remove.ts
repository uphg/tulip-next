
export function remove<T extends unknown>(array: T[], callback: (item: T, index: number, array: T[]) => boolean) {
  const result: T[] = [],
        length = array.length
  let index = -1
  while (++index < length) {
    const item = array[index]
    if (callback(item, index, array)) continue
    result.push(item)
  }
  return result
}