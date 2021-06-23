import Button from '../packages/button/index.js'
import ButtonGroup from '../packages/button-group/index.js'
import CaptchaCountdown from '../packages/captcha-countdown/index.js'
import Icon from '../packages/icon/index.js'
import Input from '../packages/input/index.js'

const components = [
  Button,
  ButtonGroup,
  CaptchaCountdown,
  Icon,
  Input
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export {
  install,
  Button,
  ButtonGroup,
  CaptchaCountdown,
  Icon,
  Input
}

export default {
  install,
  Button,
  ButtonGroup,
  CaptchaCountdown,
  Icon,
  Input
}
