import type { ExtractPropTypes, PropType } from 'vue'
import type { Fn } from '../../../types'

export type ModalProps = ExtractPropTypes<typeof modalProps>

export const modalProps = {
  visible: Boolean as PropType<boolean>,
  title: String as PropType<string>,
  maskClosable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  renderDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  onAfterEnter: Function as PropType<Fn>,
  onAfterLeave: Function as PropType<Fn>,
  disabled: Boolean as PropType<boolean>,
  disableScroll: {
    type: Boolean as PropType<boolean>,
    default: true
  }
}