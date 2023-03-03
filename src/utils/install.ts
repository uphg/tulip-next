import type { App, Plugin } from 'vue'
import type { SFCWithInstall } from '../types'

interface Name {
  name: string;
}

export function withInstall<T extends Name>(component: T) {
  (component as SFCWithInstall<T>).install = (app: App) => {
    app.component(component.name, component)
  }

  return component as SFCWithInstall<T>
}

export function makeInstaller<T extends Plugin[]>(components: T) {
  const install = (app: App) => {
    components.forEach((item) => {
      app.use(item)
    })
  }
  return { install }
}