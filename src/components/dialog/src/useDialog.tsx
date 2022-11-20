import Dialog from './Dialog'
import { TuButton } from '../../button/index'
import { TuIcon } from '../../icon/index'
import { createApp, nextTick, ref, h, onMounted, type Component } from 'vue'
import CheckCircle from '../../../icons/CheckCircle.vue'
import CloseCircle from '../../../icons/CloseCircle.vue'
import infoCircle from '../../../icons/infoCircle.vue'
import WarningCircle from '../../../icons/WarningCircle.vue'

interface DialogOptions {
  icon: Component,
  title?: string
  content?: string,
  confirm: () => void,
  cancel: () => void
}

interface DialogTypeOption {
  title?: string
  content?: string,
  confirm?: () => void,
  cancel?: () => void
}

interface DialogApi {
  [key: string]: (options: DialogTypeOption) => DialogApi
}

// const typeApi = [
//   'success',
//   'warning',
//   'info',
//   'error',
//   'question'
// ]

const typeMap = [
  ['success', CheckCircle],
  ['warning', WarningCircle],
  ['info', infoCircle],
  ['error', CloseCircle],
]

const createDialog = (options: DialogOptions) => {
  const { icon, title, content, cancel, confirm } = options
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp({
    setup() {
      const visible = ref(false)
      const handleCancel = () => {
        visible.value = false
        cancel?.()
      }
      const handleConfirm = () => {
        visible.value = false
        confirm?.()
      }

      onMounted(() => {
        void nextTick(() => { visible.value = true })
      })

      return () => (
        <Dialog
          title={title}
          v-model={[visible.value, 'visible']}
          onClosed={unmounDialog}
        >
          {{
            header: () => [
              <TuIcon class="prefix-icon" is={icon} />,
              <span class="tu-dialog__title">{() => title}</span>,
              <span
                class="tu-dialog__close"
                onClick={() => {
                  visible.value = false
                }}
              />
            ],
            default: () => content,
            footer: () => [
              h(
                TuButton,
                {
                  size: 'small',
                  onClick: handleCancel
                },
                { default: () => '取消' }
              ),
              h(
                TuButton,
                {
                  type: 'primary',
                  size: 'small',
                  onClick: handleConfirm
                },
                { default: () => '确定' }
              )
            ]
          }}
        </Dialog>
      )
    }
  })

  const mounDialog = () => {
    app.mount(div)
    div.remove()
  }

  const unmounDialog = () => {
    app.unmount()
  }

  mounDialog()
}

const createTypeApi = (icon: Component, api: DialogApi) => (
  (options?: DialogTypeOption) => {
    createDialog({ icon, ...options } as DialogOptions)
    return api
  }
)

export const useDialog = () => {

  const api = {} as DialogApi

  typeMap.forEach((item) => {
    const [type, icon] = item
    api[type] = createTypeApi(icon, api)
  })

  return api
}