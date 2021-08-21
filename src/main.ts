import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import './style/global.scss'

const TULP = 'T'

const app = createApp(App)
app.use(router)
app.mount('#app')
