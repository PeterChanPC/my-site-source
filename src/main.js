import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang/i18n'
import pinia from './stores/pinia'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(pinia)

app.mount('#app')