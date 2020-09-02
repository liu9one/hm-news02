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
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './utils/request'

import moment from 'moment'

Vue.use(Vant)
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.component('new-header', newHeader)
Vue.component('new-logo', newLogo)
Vue.component('new-navitem', newNavItem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
