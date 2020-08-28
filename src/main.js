import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 less 和 字体图标
import './styles/base.less'
import './styles/iconfont.css'
// 导入注册全局组件
import newHeader from './components/new-header'
import newLogo from './components/new-logo'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.use(Vant)
Vue.component('new-header', newHeader)
Vue.component('new-logo', newLogo)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
