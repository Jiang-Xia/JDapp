import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

const mode = import.meta.env.MODE
if (mode === 'development') {
  import('vconsole').then((res) => {
    // console.log(res,'======>')
    const vc = new res.default()
    console.warn(mode + ' vconsole:', vc.version)
  })
}
