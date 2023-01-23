import type { MaybeComputedRef, MaybeElement, VueInstance } from '../types'
import { resolveUnref } from './resolveUnref'

export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>

export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>) {
  const plain = resolveUnref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}