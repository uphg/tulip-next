import Button from './Button.vue'
import Dialog from './Dialog.vue'
import { createApp, h, nextTick } from 'vue'

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
  }

  const app = createApp({
    data() {
      return {
        visible: false
      }
    },
    mounted() {
      void nextTick(() => {
        this.visible = true
      })
    },
    render() {
      return h(
        Dialog,
        {
          title: title,
          visible: this.visible,
          'onUpdate:visible': (newVisible: boolean) => {
            this.visible = newVisible
          },
          'onClose': closeDialog
        },
        {
          default: () => content,
          footer: () => [
            h(
              Button,
              {
                size: 'small',
                onClick: () => {
                  this.visible = false
                }
              },
              { default: () => '取消' }
            ),
            h(
              Button,
              {
                type: 'primary',
                size: 'small',
                onClick: () => {
                  this.visible = false
                }
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
