import Button from './Button.vue'
import Dialog from './Dialog.vue'
import { createApp, h } from 'vue'

interface dialogOptions {
  title: string
  content: string
}

export const useDialog = () => (options: dialogOptions) => {
  const { title, content } = options
  const div = document.createElement('div')
  document.body.appendChild(div)

  const openDialog = () => {
    app.mount(div)
    div.remove()
  }

  const closeDialog = () => {
    app.unmount()
    div.remove()
  }

  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          title: title,
          visible: true,
          'onUpdate:visible': (newVisible: boolean) => {
            !newVisible && closeDialog()
          }
        },
        {
          default: () => content,
          footer: () => [
            h(
              Button,
              {
                size: 'small',
                onClick: closeDialog
              },
              { default: () => '取消' }
            ),
            h(
              Button,
              {
                type: 'primary',
                size: 'small',
                onClick: closeDialog
              },
              { default: () => '确定' }
            )
          ]
        }
      )
    },
  })

  openDialog()
}
