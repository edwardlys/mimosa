import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '',
                component: () => import('../views/Connect.vue')
            },
            {
                path: 'chat',
                component: () => import('../views/Chat.vue')
            },
            {
                path: 'call',
                component: () => import('../views/Call.vue')
            }
        ]
    },
    {
        path: '*',
        name: 'Home',
        component: () => import('../views/Home.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
