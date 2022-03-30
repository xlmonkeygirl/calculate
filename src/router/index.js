import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'result',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/calculate',
        name: 'calculate',
        component: () =>
            import ( /* webpackChunkName: "calculate" */ '../views/CalculateView.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router