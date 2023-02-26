import { createApp, nextTick, ref, onMounted } from 'vue'
import TuDialog from './Dialog'
import TuModal from '../../modal/src/Modal'
import type { DialogProps } from './dialogProps'

interface DialogApi {
  [key: string]: (options: DialogProps) => { destroy: () => void }
}

function createDialog(options?: DialogProps) {
  const { status, title, content, confirmText, cancelText, onCancel, onConfirm } = options || {}
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp({
    setup() {
      const visible = ref(false)

      function handleCancel(e: MouseEvent) {
        if (onCancel) {
          void Promise.resolve(onCancel(e)).then((result) => {
            if (result === false) return
            close()
          })
        } else {
          close()
        }
      }

      function handleConfirm(e: MouseEvent) {
        if (onConfirm) {
          void Promise.resolve(onConfirm(e)).then((result) => {
            if (result === false) return
            close()
          })
        } else {
          close()
        }
      }

      function close() {
        visible.value = false
      }

      onMounted(() => {
        void nextTick(() => { visible.value = true })
      })

      return () => (
        <TuModal v-model={[visible.value, 'visible']} onAfterClose={destroy}>
          <TuDialog
            title={title}
            content={content}
            status={status}
            confirmText={confirmText}
            cancelText={cancelText}
            onClose={close}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </TuModal>
      )
    }
  })

  function moun() {
    app.mount(div)
    div.remove()
  }

  function destroy() {
    app.unmount()
  }

  moun()

  return {
    destroy
  }
}

const statusList = ['success', 'warning', 'error'] as const

export function useDialog() {
  const api: DialogApi = {}
  statusList.forEach((status) => {
    api[status] = (options: DialogProps) => createDialog({ status, ...options})
  })

  return api
}