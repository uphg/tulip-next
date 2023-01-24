import { customRef, toRefs as _toRefs, isRef, type ToRefs } from 'vue'
import type { MaybeRef, ObjectLike } from '../types'
  
export function toRefs<T extends object>(objectRef: MaybeRef<T>) {
  if (!isRef(objectRef)) {
    return _toRefs(objectRef as object) as ToRefs<T>
  }

  const result: ToRefs<T> | {} = Array.isArray(objectRef.value)
    ? new Array(objectRef.value.length)
    : {}

  for (const key in objectRef.value) {
    (result as ObjectLike)[key] = customRef(() => ({
      get() {
        return objectRef.value[key]
      },
      set(newValue) {
        objectRef.value[key] = newValue
      }
    }))
  }

  return result as ToRefs<T>
}