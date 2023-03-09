import { createApp } from 'vue'
import Tulp from '../src/index'
import App from './App.vue'
import '../src/styles/index.styl'
import './assets/main.css'

const app = createApp(App)

console.log('Tulp')
console.log(Tulp)

app.use(Tulp)
app.mount('#app')
