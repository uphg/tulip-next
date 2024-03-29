import type { MaybeComputedRef, MaybeElement, VueInstance } from '../types'
import { resolveUnref } from './resolveUnref'

export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>
export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance ? Exclude<MaybeElement, VueInstance> : T | undefined

export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = resolveUnref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}