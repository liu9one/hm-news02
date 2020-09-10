import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 less 和 字体图标
import './styles/base.less'
import './styles/iconfont.css'

import 'amfe-flexible'
import './utils/request'
import './utils/global'
import './utils/vant'
import './utils/filters'

Vue.config.productionTip = false

// 使用bus 传递参数
const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
