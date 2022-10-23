export const iconStatusKey = Symbol('tulp-icon-symbol')

export interface IconStatus extends Window {
  [iconStatusKey]: boolean
}
