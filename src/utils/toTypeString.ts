const objectToString = Object.prototype.toString

export function toTypeString(value: unknown) {
  return objectToString.call(value)
}
