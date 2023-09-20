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
            path: '/Newpost/:id',
            name: 'Newpost',
            component: () => import('./components/Newpost.vue')
        }
    ]
})

export default router