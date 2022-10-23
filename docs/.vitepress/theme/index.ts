import '../../../src/styles/index.styl'
import './style.css'
import DefaultTheme from 'vitepress/theme'
// import Code from '../components/e-code.vue'
import Demo from '../components/EDemo.vue'
import Tulp from '../../../src/index'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.component('e-code', Code)
    app.component('EDemo', Demo)
    app.use(Tulp)
  }
}
