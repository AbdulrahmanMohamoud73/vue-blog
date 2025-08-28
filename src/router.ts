import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./components/Home.vue')
        },
        {
            path: '/Post/:id',
            name: 'Post',
            component: () => import('./components/Post.vue')
        },
        {
            path: '/Editor/:id',
            name: 'Editor',
            component: () => import('./components/Editor.vue')
        }
    ]
})

export default router