import Button from '../packages/Button.vue'
import ButtonGroup from '../packages/ButtonGroup.vue'
import Countdown from '../packages/Countdown.vue'
import Icon from '../packages/Icon.vue'
const components = [
  Button,
  ButtonGroup,
  Countdown,
  Icon
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
  Icon
}
