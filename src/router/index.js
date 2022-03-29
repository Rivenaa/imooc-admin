import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
