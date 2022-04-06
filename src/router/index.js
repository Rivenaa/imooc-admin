import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const publicRoutes = [
  {
    path: '/',
    component: () => import('@/views/Layout')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/* 白名单 */
const whiteList = ['/login']

/* 路由前置守卫 */
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
