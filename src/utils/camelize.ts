const reCamelize = /-(\w)/g

// See https://github.com/vuejs/core/blob/main/packages/shared/src/index.ts
export function camelize(string: string) {
  return string.replace(reCamelize, (_, a) => (a ? a.toUpperCase() : ''))
}
