import { isNumber } from '../../../utils'

export function toCSSValue(value?: string | number) {
  return isNumber(value) ? `${value}px` : value
}