export function toPx(value: unknown) {
  return (typeof value === 'string' ? parseInt(value as string, 2) : value) + 'px' 
}