export type JustifyTypes = 'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
export type AlignTypes = 'start' | 'end' | 'center' | 'stretch'

export const justifyTypes = ['center', 'start', 'end', 'space-between', 'space-around', 'space-evenly']
export const alignTypes = ['start', 'end', 'center', 'stretch', 'baseline']

export function toFlexPrefix(value: unknown) {
  return `${value === 'start' || value === 'end' ? 'flex-' : ''}${value}`
}