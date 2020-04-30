import Vue from 'vue'

import router from './router'
import i18n from './lang'
import http from './http'
import App from './App'
import VueParticles from 'vue-particles'
import ElementUi from 'element-ui'
import './mock'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUi)
Vue.use(VueParticles)

Vue.prototype.$http = http

new Vue({
  el: "#main",
  i18n,
  router,
  template: '<App />',
  components: {
    App
  }
})