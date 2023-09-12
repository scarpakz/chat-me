import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

AOS.init();
app.mount('#app')
