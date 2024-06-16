import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import OAuthCallback from '@/views/OAuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index.html',
      name: 'home',
      component: MainView
    },
    {
      path: '/index.html/oauthcallback',
      name: 'OAuthCallback',
      component: OAuthCallback
    }
  ]
})

export default router
