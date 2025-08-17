import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
  .use(VueKonva)
  .use(pinia)
  .mount('#app')
  
