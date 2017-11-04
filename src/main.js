import Vue from 'vue'
import router from './router'
import httpRequest from './utils/request'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.prototype.$http = httpRequest

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
