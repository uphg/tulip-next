export function pick<T extends Record<string, unknown>>(object: T, keys: string[]) {
  const result: Record<string, unknown> = {}
  for (const key of keys) {
    result[key] = object[key]
  }
  return result
}
