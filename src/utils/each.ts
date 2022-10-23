import isArray from "./isArray";

function each<T>(
  obj: T[] | { [key: string]: T },
  callback: (item: T, inedx: number | string, obj: T[] | { [key: string]: T }) => void
) {
  if (isArray(obj)) {
    let index = -1
    const length = obj.length
    while (++index < length) {
      callback(obj[index], index, obj)
    }
  } else {
    let index = -1
    const keys = Object.keys(obj)
    const length = keys.length
    while (++index < length) {
      const key = keys[index]
      callback(obj[key], key, obj)
    }
  }
}

export default each