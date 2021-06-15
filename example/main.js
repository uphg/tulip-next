import Vue from 'vue'
import App from './App.vue'

import { Button, ButtonGroup, Countdown, Icon, Input } from '../src/index.js'

// import Button from '../packages/button/index.js'
// import ButtonGroup from '../packages/button-group/index.js'
// import Countdown from '../packages/countdown/index.js'
// import Icon from '../packages/icon/index.js'
// import Input from '../packages/input/index.js'

Vue.config.productionTip = false

// Vue.component('TCountdown', Countdown)
// Vue.component('TInput', Input)

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Icon)
Vue.use(Countdown)
Vue.use(Input)

new Vue({
  render: h => h(App)
}).$mount('#app')
