import type { ExtractPropTypes, PropType } from 'vue'
import type { Fn } from '../../../types'

export type ModalProps = ExtractPropTypes<typeof modalProps>

export const modalProps = {
  visible: Boolean as PropType<boolean>,
  onAfterEnter: Function as PropType<Fn>,
  onAfterLeave: Function as PropType<Fn>,
  disabled: Boolean as PropType<boolean>,
  maskClosable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  renderDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  disableScroll: {
    type: Boolean as PropType<boolean>,
    default: true
  }
}