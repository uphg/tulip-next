function map<T, U>(
  array: T[] | number,
  callback: (value: T | number, index: number, array: T[] | number) => U
): U[] {
  const isNumber = typeof array === 'number'
  const length = isNumber ? array : array.length
  const result = []
  let index = -1
  while (++index < length) {
    const item = isNumber ? index + 1 : array[index]
    result[index] = callback(item, index, array)
  }

  return result
}

export default map