import type { App } from 'vue'
import { Button, ButtonGroup } from './button/index'
import { Input, InputGroup, InputGroupLabel } from './input/index'
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

const components = [
  Button, ButtonGroup,
  Input, InputGroup, InputGroupLabel,
  CollapseTransition
]

const install = (app: App) => {
  components.forEach((item) => app.use(item))
}

export {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputGroupLabel,
  CollapseTransition,
  install
}