import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import CloudMining from '../views/CloudMining.vue'
import HelpView from '../views/HelpView.vue'
import PoolMining from '../views/PoolMining.vue'
import SoloMining from '../views/SoloMining.vue'

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/cloud',
        component: CloudMining,
    },
    {
        path: '/help',
        component: HelpView,
    },
    {
        path: '/pool',
        component: PoolMining,
    },
    {
        path: '/solo',
        component: SoloMining,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
