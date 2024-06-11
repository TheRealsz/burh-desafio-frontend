
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});
app.use(ToastService);

app.mount('#app')
