import { trim } from '../trim'

export function splitClass(string: string) {
  return string && string.split(' ').filter(item => !!trim(item))
}
