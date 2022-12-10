export function isNaN(value: unknown): value is number {
  return Number.isNaN(value)
}