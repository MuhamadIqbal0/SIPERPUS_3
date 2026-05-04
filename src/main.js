// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// Import globals.css (Tailwind + CSS variables shadcn)
import './assets/globals.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
