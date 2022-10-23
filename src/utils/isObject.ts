function isObject(value: unknown) {
  const type = typeof value
  return value !== null && type === 'object'
}

export default isObject
