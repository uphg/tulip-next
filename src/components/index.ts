import type { App } from 'vue'
import { Button, ButtonGroup } from './button/index'
import { CollapseTransition } from './collapse-transition/index'

// export * from './icon/index'
// export * from './switch/index'

// export * from './input/index'
// export * from './collapse-transition/index'
// export * from './expand-transition/index'
// export * from './fade-transition/index'
// export * from './dialog/index'
// export * from './tabs/index'
// export * from './pagination/index'


const install = (app: App) => {
  app.component(Button.name, Button)
  app.component(ButtonGroup.name, ButtonGroup)
  app.component(CollapseTransition.name, CollapseTransition)
}
export {
  Button,
  ButtonGroup,
  CollapseTransition,
  install
}