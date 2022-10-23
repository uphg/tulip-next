import { createApp, h } from 'vue'
import IconPack from './IconPack.vue'
import { iconStatusKey } from './icon-status'
import type { IconStatus } from './icon-status'
import isServer from '../utils/isServer'

export const useIcons = (window: Window) => {
  if (isServer) return
  if ((window as IconStatus)[iconStatusKey]) return
  ;(window as IconStatus)[iconStatusKey] = true

  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.width = '0'
  div.style.height = '0'
  div.style.overflow = 'hidden'

  const firstChild = document.body.firstChild
  document.body.insertBefore(div, firstChild)

  const app = createApp({
    render() {
      return h(IconPack)
    }
  })

  app.mount(div)
}
