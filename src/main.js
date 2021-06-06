import Vue from 'vue'
import App from './App.vue'
import './icon/tulip-icon.js'
import './style.scss'
import './styles/button.scss'

import Button from '../packages/Button.vue'
import ButtonGroup from '../packages/ButtonGroup.vue'
import Countdown from '../packages/Countdown.vue'
import Icon from '../packages/Icon.vue'

Vue.config.productionTip = false

Vue.component('TButton', Button)
Vue.component('TButtonGroup', ButtonGroup)
Vue.component('TCountdown', Countdown)
Vue.component('TIcon', Icon)

new Vue({
  render: h => h(App)
}).$mount('#app')
