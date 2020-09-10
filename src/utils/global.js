import Vue from 'vue'
// 导入注册全局组件
import newHeader from '../components/new-header'
import newLogo from '../components/new-logo'
import newNavItem from '../components/new-navitem.vue'
import newsPost from '../components/news-post.vue'
import hmComment from '../components/hm-comment.vue'
import hmFloor from '../components/hm-floor.vue'

Vue.component('new-header', newHeader)
Vue.component('new-logo', newLogo)
Vue.component('new-navitem', newNavItem)
Vue.component('news-post', newsPost)
Vue.component('hm-comment', hmComment)
Vue.component('hm-floor', hmFloor)
