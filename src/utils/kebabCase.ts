const reKebab = /(?<=\w+)[A-Z][^A-Z]*/g

function kebabCase(value: string) {
  return value.replace(reKebab, ($1) => $1 ? '-' + $1.toLowerCase() : '')
}

export default kebabCase