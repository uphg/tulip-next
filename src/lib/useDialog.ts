import Button from './Button.vue'
import Dialog from './Dialog.vue'
import { createApp, h } from 'vue'

export const useDialog = () => (options: {[key: string]: string}) => {
  const { title, content } = options
  const div: HTMLDivElement = document.createElement('div')
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
          title,
          visible: true,
          'onUpdate:visible': (newVisible: boolean) => {
            newVisible === false && closeDialog()
          }
        },
        {
          default: () => content,
          footer: () => [
            h(
              Button,
              {
                size: 'small',
                onClick: () => {
                  console.log('我被点击了')
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
                  console.log('我被点击了')
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