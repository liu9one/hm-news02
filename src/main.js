import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 less 和 字体图标
import './styles/base.less'
import './styles/iconfont.css'
// 导入注册全局组件
import newHeader from './components/new-header'
import newLogo from './components/new-logo'
import newNavItem from './components/new-navitem.vue'
// 导入vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import axios from 'axios'
import moment from 'moment'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求之前做的事
  console.log(config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(res => {
  // 对响应数据做的事
// 解决在响应拦截解决token时效问题
  console.log(res)
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户验证失败') {
    // 1.跳转到login
    router.push('/login')
    // 2.清除token
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast(message)
  }
  return res
})
Vue.use(Vant)
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
Vue.component('new-header', newHeader)
Vue.component('new-logo', newLogo)
Vue.component('new-navitem', newNavItem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
