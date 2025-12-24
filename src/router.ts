import { createRouter, createWebHistory } from 'vue-router'
import { api } from './composables/posts'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./components/Home.vue')
        },
        {
            path: '/post/:id',
            name: 'post',
            component: () => import('./components/Post.vue')
        },
        {
            path: '/editor/:id',
            name: 'editor',
            component: () => import('./components/Editor.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/Login.vue')

        }
    ]
})

const checkAuthentication = async (): Promise<boolean> => {
    try {
        await api.get('auth/validate')
        return true
    } catch (error: any) {
        localStorage.removeItem('authToken')
        console.log('Login failed. Invalid or expired Token')
        return false
    }
}

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
      const token = localStorage.getItem('authToken')

      if (!token || token == 'undefined') {
          return next({ path: '/login', query: { redirect: to.fullPath }});
      }

      const isAuthenticated = await checkAuthentication()

      if (isAuthenticated){
          next()
      } else {
          next({ path: '/login', query: { redirect: to.fullPath }})
      }
  } else {
      next()
  }
})

export default router