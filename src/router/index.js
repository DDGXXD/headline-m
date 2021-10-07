import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/homPage/homPage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/mine',
    component: () => import('@/views/mine/mine.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
