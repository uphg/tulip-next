export function map<T extends unknown, U extends unknown>(
  array: T[] | undefined,
  callback: (value: T, index: number, array: T[] | number) => U
): U[] {
  if (!array) return []
  const length = array.length
  const result = []
  let index = -1

  while (++index < length) {
    const item = array[index]
    result[index] = callback(item, index, array)
  }

  return result
}
