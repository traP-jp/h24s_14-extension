import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const container = document.getElementById('logo')
container?.insertAdjacentHTML('beforebegin', `<div id="vue-app"></div>`)
alert('ok!')

const app = createApp(App)

app.use(router)

app.mount('#vue-app')
