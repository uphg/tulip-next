import Button from '../packages/button/index.js'
import ButtonGroup from '../packages/button-group/index.js'
import Countdown from '../packages/Countdown.vue'
import Icon from '../packages/Icon.vue'
import Input from '../packages/Input.vue'

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
