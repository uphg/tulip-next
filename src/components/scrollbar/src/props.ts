import type { ExtractPropTypes, PropType } from 'vue'

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export const scrollbarProps = {
  trigger: {
    type: String as PropType<'hover' | 'none'>,
    default: 'hover'
  },
  size: {
    type: String as PropType<'medium' | 'large'>,
    default: 'medium'
  },
  onScroll: Function as PropType<(e: Event) => void>,
}
