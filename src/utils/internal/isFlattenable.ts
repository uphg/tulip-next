const spreadableSymbol = Symbol.isConcatSpreadable
export function isFlattenable(value: unknown) {
  return Array.isArray(value) || !!(value as any)?.[spreadableSymbol]
}
