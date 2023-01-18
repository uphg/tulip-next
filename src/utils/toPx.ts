export function toPx(value: string | number | undefined | null) {
  return value ? `${typeof value === 'string' ? parseInt(value, 10) : value}px` : void 0
}
