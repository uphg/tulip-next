const objectToString = Object.prototype.toString

function toTypeString(value: unknown) {
  return objectToString.call(value)
}

export default toTypeString
