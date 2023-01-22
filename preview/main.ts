import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Tulp from 'src/index'

import App from './App.vue'
import router from './router'
import '../src/styles/index.styl'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Tulp)

app.mount('#app')
