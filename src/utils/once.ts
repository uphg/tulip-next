export function once(fn?: (() => unknown)) {
  if (!fn) return
  let result: unknown | undefined
  let notCalled: boolean | undefined = true
  return function (this: any, ...args: []) {
    if(notCalled) {
      notCalled = void 0
      result = fn?.apply(this, args)
    } else {
      fn = void 0
    }
    return result
  }
}