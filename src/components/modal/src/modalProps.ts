import type { Fn } from 'tulptypes'
import type { ExtractPropTypes, PropType } from 'vue'

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
  onAfterOpen: Function as PropType<Fn>,
  onAfterClose: Function as PropType<Fn>,
  disabled: Boolean as PropType<boolean>,
  disableScroll: {
    type: Boolean as PropType<boolean>,
    default: true
  }
}