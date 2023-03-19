import { customRef, ref, toRef, watch, type EmitsOptions, type SetupContext } from 'vue'
import { tryOnScopeDispose } from './tryOnScopeDispose'

export function useCachedValue<T extends object, K extends keyof T, E extends EmitsOptions>(
  props: T,
  key: K,
  options: {
    context: SetupContext<E>,
    defaultValue?: T[K],
    watchCallback?: (value: T[K]) => void
  }
) {
  const { context, watchCallback, defaultValue = void 0 } = options
  const _value = ref<T[K]>(defaultValue as T[K])
  const value = toRef<T, K>(props, key)

  const stopWatch = watch(value, (newValue) => {
    if (typeof newValue === 'undefined') return
    _value.value = newValue
    watchCallback?.(newValue)
  })

  const result = customRef((track, trigger) => ({
    get() {
      track()
      return _value.value
    },
    set(newValue) {
      if (typeof value.value === 'undefined') {
        _value.value = newValue
      }
      context.emit(`update:${key as string}`, newValue)
      trigger()
    }
  }))

  tryOnScopeDispose(stopWatch)

  return result
}
