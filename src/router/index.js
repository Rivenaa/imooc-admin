import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import Layout from '@/views/Layout'

/* 私有路由表 */
const privateRouters = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        /* 用户管理 */
        path: '/user/manage',
        name: 'user-manage',
        component: () => import('@/views/UserManage'),
        meta: {
          title: 'user-manage',
          icon: 'personnel-manage'
        }
      },
      {
        /* 角色列表 */
        path: '/user/role',
        name: 'role-list',
        component: () => import('@/views/UserRole'),
        meta: {
          title: 'role-list',
          icon: 'role'
        }
      },
      {
        /* 权限列表 */
        path: '/user/permission',
        name: 'permisson-list',
        component: () => import('@/views/UserPermission'),
        meta: {
          title: 'permisson-list',
          icon: 'permission'
        }
      },
      {
        /* 用户信息 */
        path: '/user/info/:id',
        name: 'user-info',
        component: () => import('@/views/UserInfo'),
        meta: {
          title: 'user-info'
        }
      },
      {
        /* excel导入 */
        path: '/user/import',
        name: 'excel-import',
        component: () => import('@/views/UserImport'),
        meta: {
          title: 'excel-import'
        }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        /* 文章排名 */
        path: '/article/ranking',
        name: 'article-ranking',
        component: () => import('@/views/ArticleRanking'),
        meta: {
          title: 'article-ranking',
          icon: 'article-ranking'
        }
      },
      {
        /* 文章详情 */
        path: '/article/detail/:id',
        name: 'article-detail',
        component: () => import('@/views/ArticleDetail'),
        meta: {
          title: 'article-detail'
        }
      },
      {
        /* 创建文章 */
        path: '/article/create',
        name: 'article-create',
        component: () => import('@/views/ArticleCreate'),
        meta: {
          title: 'article-create',
          icon: 'article-create'
        }
      },
      {
        /* 编辑文章 */
        path: '/article/editor/:id',
        name: 'article-editor',
        component: () => import('@/views/ArticleCreate'),
        meta: {
          title: 'article-editor'
        }
      }
    ]
  }
]

/* 公开路由表 */
const publicRoutes = [
  {
    /* 登录页面 */
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    /* layout页面 */
    path: '/',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        /* 个人中心 */
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        /* 错误页面401 */
        path: '/401',
        name: '401',
        component: () => import('@/views/EorrPage/401')
      },
      {
        /* 错误页面404 */
        path: '/404',
        name: '404',
        component: () => import('@/views/EorrPage/404')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRouters]
})

/* 白名单 */
const whiteList = ['/login']

/* 路由前置守卫 */
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
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
