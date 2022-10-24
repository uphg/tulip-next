import '../../../src/styles/index.styl'
import './style.css'
import DefaultTheme from 'vitepress/theme'
import Tulp from '../../../src/index'
import Code from '../components/ECode.vue'
import Demo from '../components/EDemo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ECode', Code)
    app.component('EDemo', Demo)
    app.use(Tulp)
  }
}
