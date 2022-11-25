import type { PropType, ExtractPropTypes } from "vue"

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverProps = {
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>,
    default: 'hover',
    validator(value: string) {
      return ['hover', 'click', 'focus', 'manual'].indexOf(value) > -1
    }
  },
  content: String as PropType<string>,
  visible: {
    type: Boolean as PropType<boolean>,
    default: void 0
  },
  placement: {
    type: String as PropType<
      'top-start' | 'top' | 'top-end' |
      'left-start' | 'left' | 'left-end' |
      'right-start' | 'right' | 'right-end' |
      'bottom-start' | 'bottom' | 'bottom-end'
    >,
    default: 'top',
    validator(value: string) {
      return ['top', 'left', 'bottom', 'right'].indexOf(value) > -1
    }
  }
}