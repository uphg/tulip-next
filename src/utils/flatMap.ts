export function flatMap<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): U[] {
  const length = array?.length || 0
  const result: U[] = []
  for (let i = 0; i < length; i++) {
    const item = callback(array[i], i, array)
    if (Array.isArray(item)) {
      result.push(...item)
    } else {
      result.push(item)
    }
  }
  return result
}

