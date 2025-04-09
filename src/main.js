import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang/i18n'
import pinia from './stores/pinia'
import '@/assets/uicons-regular-rounded/css/uicons-regular-rounded.css'
import '@/assets/uicons-brands/css/uicons-brands.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(pinia)

app.mount('#app')