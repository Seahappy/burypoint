import { buryPoint } from 'ft-burypoint'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(buryPoint, router, {
    url: 'http://localhost:1314',
    defaultPath: 'point',
    visAreaThreshold: 0.2,
    uniqueIDConfig: {
        key: "ppid"
    }
})

app.mount('#app')
