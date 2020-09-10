import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "user" */ '../views/user/Login.vue')
const Register = () => import(/* webpackChunkName: "user" */ '../views/user/Register.vue')
const User = () => import(/* webpackChunkName: "user" */ '../views/user/User.vue')
const UserEdit = () => import(/* webpackChunkName: "user" */ '../views/user/UserEdit.vue')
const MyFollow = () => import(/* webpackChunkName: "user" */ '../views/user/MyFollow.vue')
const MyComment = () => import(/* webpackChunkName: "user" */ '../views/user/MyComment.vue')
const MyStar = () => import(/* webpackChunkName: "user" */ '../views/user/MyStar.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/news/Home.vue')
const Manage = () => import(/* webpackChunkName: "news" */ '../views/news/Manage.vue')
const Article = () => import(/* webpackChunkName: "news" */ '../views/news/Article.vue')
const Search = () => import(/* webpackChunkName: "news" */ '../views/news/Search.vue')

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
