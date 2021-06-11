import Vue from 'vue'
import App from './App.vue'

import Button from '../packages/button/index.js'
import ButtonGroup from '../packages/button-group/index.js'
import Countdown from '../packages/Countdown.vue'
import Icon from '../packages/Icon.vue'
import Input from '../packages/Input.vue'

Vue.config.productionTip = false

Vue.component('TCountdown', Countdown)
Vue.component('TIcon', Icon)
Vue.component('TInput', Input)

Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)

new Vue({
  render: h => h(App)
}).$mount('#app')
