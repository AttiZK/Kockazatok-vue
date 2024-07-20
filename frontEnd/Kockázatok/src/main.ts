import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueScrollTo from 'vue-scrollto';
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const vuetify = createVuetify()

createApp(App)
  .use(router)
  .use(VueScrollTo)
  .use(vuetify)
  .mount('#app')