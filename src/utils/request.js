import Vue from 'vue'
import router from '../router'
import { Toast } from 'vant'
import axios from 'axios'
Vue.prototype.$axios = axios
const URL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
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
