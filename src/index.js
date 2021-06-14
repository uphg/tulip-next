import Button from '../packages/button/index.js'
import ButtonGroup from '../packages/button-group/index.js'
import Countdown from '../packages/countdown/index.js'
import Icon from '../packages/icon/index.js'
import Input from '../packages/input/index.js'

const components = [
  Button,
  ButtonGroup,
  Countdown,
  Icon,
  Input
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  Button,
  ButtonGroup,
  Countdown,
  Icon,
  Input
}
