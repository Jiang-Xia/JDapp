import { createRouter, /*  createWebHistory, */ createWebHashHistory } from 'vue-router'
// import { getToken } from '@/utils/auth'
export const WHITE_LIST = [{ path: '/start' }]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页'
      }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
