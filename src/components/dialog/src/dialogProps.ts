import type { ExtractPropTypes, PropType } from 'vue'
import type { Fn } from '../../../types'

export type DialogStatus = 'success' | 'warning' | 'info' | 'error'
export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogProps = {
  visible: Boolean as PropType<boolean>,
  title: String as PropType<string>,
  content: String as PropType<string>,
  status: String as PropType<DialogStatus>,
  confirmText: String as PropType<string>,
  cancelText: String as PropType<string>,
  onClose: Function as PropType<Fn>,
  onConfirm: Function as PropType<(e: MouseEvent) => boolean | Promise<boolean> | any>,
  onCancel: Function as PropType<(e: MouseEvent) => boolean | Promise<boolean> | any>,
  closable: Boolean as PropType<boolean>
}
