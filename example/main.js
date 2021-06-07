import Vue from 'vue'
import App from './App.vue'

import Button from '../packages/Button.vue'
import ButtonGroup from '../packages/ButtonGroup.vue'
import Countdown from '../packages/Countdown.vue'
import Icon from '../packages/Icon.vue'
import Input from '../packages/Input.vue'

Vue.config.productionTip = false

Vue.component('TButton', Button)
Vue.component('TButtonGroup', ButtonGroup)
Vue.component('TCountdown', Countdown)
Vue.component('TIcon', Icon)
Vue.component('TInput', Input)

new Vue({
  render: h => h(App)
}).$mount('#app')
