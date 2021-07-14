import Vue from 'vue'
import App from './App.vue'

import { Button, ButtonGroup, CaptchaCountdown, Icon, Input, Row, Col, Layout, Header, Main, Footer, Aside, Scrollbar } from '../src/index.js'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Icon)
Vue.use(CaptchaCountdown)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)

Vue.use(Layout)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Scrollbar)

new Vue({
  render: h => h(App)
}).$mount('#app')
