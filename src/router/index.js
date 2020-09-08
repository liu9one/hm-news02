import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
import Home from '../views/news/Home.vue'
import Manage from '../views/news/Manage.vue'
import Article from '../views/news/Article.vue'
import Search from '../views/news/Search.vue'

Vue.use(VueRouter)

// 全局把push异常处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/my-follow', component: MyFollow, name: 'my-follow' },
  { path: '/my-comment', component: MyComment, name: 'my-comment' },
  { path: '/my-star', component: MyStar, name: 'my-star' },
  { path: '/', component: Home, name: 'home' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/article/:id', component: Article, name: 'article' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
})

// 配置全局导航守卫
// to: 到哪去
// from 从哪来
// next  函数是否放行
// 判断 to的path 是否 是/user 判断用户是否去个人中心
// 1. 不是去user next() 放行
// 2.如果是 判断是否有token
// 有放行 没有跳转到login
router.beforeEach((to, from, next) => {
  // 只要路由发生跳转,跳转之前这个函数就要执行
  const token = localStorage.getItem('token')
  // console.log(token)
  const authUrls = ['user', 'user-edit', 'my-follow', 'my-commnet']
  if (!authUrls.includes(to.name) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
