export function toPx(value: unknown) {
  return value ? (typeof value === 'string' ? parseInt(value as string, 2) : value) + 'px' : void 0
}
