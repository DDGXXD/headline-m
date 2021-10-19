import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/homPage/homPage.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/homPage/main/index.vue')
      },
      {
        path: '/mine',
        component: () => import('@/views/mine/mine.vue')
      },
      {
        path: '/video',
        component: () => import('@/views/Video/video.vue')
      },
      {
        path: '/qa',
        component: () => import('@/views/questions/questions.vue')
      }

    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/settings',
    component: () => import('@/views/Settings/settings.vue')
  },
  {
    path: '/message',
    component: () => import('@/views/Message/message.vue')
  },
  {
    path: '/news/:p',
    props: true,
    component: () => import('@/views/newsDetail/index.vue')
  },
  {
    path: '/userfeedback',
    component: () => import('@/views/userFeed/index.vue')
  },
  {
    path: '/airobot',
    component: () => import('@/views/AIrobot/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
