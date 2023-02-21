import { createApp, nextTick, ref, h, onMounted, type Component } from 'vue'
import Dialog from './Dialog'
import { TuButton } from '../../button/index'
import { TuIcon } from '../../icon/index'
import { CheckCircle, CloseCircle, WarningCircle, InfoCircle } from '../../../icons'

interface DialogOptions {
  icon?: Component,
  title?: string
  content?: string,
  confirm?: () => void,
  cancel?: () => void
}

interface DialogApi {
  [key: string]: (options: DialogOptions) => { destroy: () => void }
}

const typeMap: [string, Component][] = [
  ['success', CheckCircle],
  ['warning', WarningCircle],
  ['info', InfoCircle],
  ['error', CloseCircle],
]

function createDialog(options: DialogOptions) {
  const { icon, title, content, cancel, confirm } = options
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp({
    setup() {
      const visible = ref(false)

      function handleCancel() {
        visible.value = false
        cancel?.()
      }
      function handleConfirm() {
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
          onClosed={destroy}
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
                  hue: 'primary',
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

function createTypeApi(icon: Component) {
  return (options?: DialogOptions) => {
    return createDialog({ icon, ...options })
  }
}

export function useDialog() {
  const api: DialogApi = {} 

  typeMap.forEach((item) => {
    const [type, icon] = item
    api[type] = createTypeApi(icon)
  })

  return api
}