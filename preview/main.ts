import { createApp } from 'vue'
import Tulp from '../src/index'
import App from './App.vue'
import '../src/styles/index.styl'
import './assets/main.css'

const app = createApp(App)

app.use(Tulp)
app.mount('#app')
