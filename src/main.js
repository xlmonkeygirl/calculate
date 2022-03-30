import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { throttle, debounce } from "@/utils/tools"

const app = createApp(App)
    // app.config.globalProperties.$throttle = throttle;
    // app.config.globalProperties.$debounce = debounce;

app.use(ElementPlus).use(store).use(router).mount('#app')