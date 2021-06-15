import Vue from 'vue'
import App from './App.vue'

import { Button, ButtonGroup, Countdown, Icon, Input } from '../src/index.js'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Icon)
Vue.use(Countdown)
Vue.use(Input)

new Vue({
  render: h => h(App)
}).$mount('#app')
