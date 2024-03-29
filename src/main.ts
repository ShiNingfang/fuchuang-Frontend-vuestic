import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'

import ElementPlus from 'element-plus'
import * as icons from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'
// import { mockXHR } from './mock'

// import { createPinia } from 'pinia'
// import piniaPluginPersist from 'pinia-plugin-persist'
// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

// // console.log(import.meta.env.VITE_APP_NODE_ENV)
// if (import.meta.env.VITE_APP_NODE_ENV === 'development') {
//   // console.log('开启mock')
//   mockXHR()
// }
// 动态引入 Mock 设置的示例
if (import.meta.env.VITE_APP_NODE_ENV === 'development') {
  import('./mock')
    .then((mockModule) => {
      console.log('开启mock')
      mockModule.mockXHR()
    })
    .catch((err) => console.error('Mock 模块加载失败', err))
}

const app = createApp(App)

// const pinia = createPinia()
// pinia.use(piniaPluginPersist)
// app.use(pinia)

for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}

app.use(i18n)
app.use(stores)
app.use(router)
app.use(ElementPlus)
app.use(createVuestic({ config: vuesticGlobalConfig }))

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router,
    }),
  )
}

app.mount('#app')
