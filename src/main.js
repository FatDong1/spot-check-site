import Vue from 'vue'
import router from './router'
import store from './vuex'
import httpRequest from './utils/request'
import ElementUI from 'element-ui'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import ViewContentFloat from './components/common/view-layout/view-content-float.vue'
import ViewContainer from './components/common/view-layout/view-container.vue'
import ViewHeader from './components/common/view-layout/view-header.vue'
import ViewContent from './components/common/view-layout/view-content.vue'
import ViewHeaderFlex from './components/common/view-layout/view-header-flex.vue'
import ToolBar from './components/common/toolbar/index.vue'
import RowLayout from './components/common/row-layout/index.vue'
import { InfoDetail, InfoDetailItem } from './components/common/info-detail/index.js'
import App from './App.vue'

Vue.use(ElementUI)

Vue.component('view-content-float', ViewContentFloat)
Vue.component('view-container', ViewContainer)
Vue.component('view-header', ViewHeader)
Vue.component('view-content', ViewContent)
Vue.component('view-header-flex', ViewHeaderFlex)
Vue.component('tool-bar', ToolBar)
Vue.component('row-layout', RowLayout)
Vue.component('info-detail', InfoDetail)
Vue.component('info-detail-item', InfoDetailItem)

Vue.prototype.$http = httpRequest

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
