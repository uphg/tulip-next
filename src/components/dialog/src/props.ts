import type { ExtractPropTypes, PropType } from 'vue'

export type DialogStatus = 'success' | 'warning' | 'info' | 'error'
export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogHandler = (e: MouseEvent) => boolean | Promise<boolean> | any

export const dialogProps = {
  title: String as PropType<string>,
  content: String as PropType<string>,
  status: String as PropType<DialogStatus>,
  confirmText: String as PropType<string>,
  cancelText: String as PropType<string>,
  onClose: Function as PropType<DialogHandler>,
  onConfirm: Function as PropType<DialogHandler>,
  onCancel: Function as PropType<DialogHandler>
}
