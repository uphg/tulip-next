export function useNameScope(prefix: string) {
  const base = `tu-${prefix}`
  return {
    get base() {
      return base
    },
    // suffix
    suffix(value: string | null) {
      return `${base}-${value}`
    },
    // element
    el(value: string | null) {
      return `${base}__${value}`
    },
    // status
    is(value?: string){
      return `${base}--${value}`
    }
  }
}