import Vue from 'vue'
import App from './App.vue'

import { Button, ButtonGroup, CaptchaCountdown, Icon, Input, Row, Col } from '../src/index.js'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Icon)
Vue.use(CaptchaCountdown)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)

new Vue({
  render: h => h(App)
}).$mount('#app')
