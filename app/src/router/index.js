import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        alias: ['/home'],
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '',
                name: 'Main',
                component: () => import('../views/Main.vue')
            },
            {
                path: 'text',
                name: 'Text',
                component: () => import('../views/Text.vue')
            },
            {
                path: 'video',
                name: 'Video',
                component: () => import('../views/Video.vue')
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
