export function toNumber(value: unknown) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    return parseInt(value, 10)
  }

  return Number(value)
}