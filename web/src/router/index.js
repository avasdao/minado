import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView'

import AdminView from '../views/AdminView'
import CloudMining from '../views/CloudMining'
import HelpView from '../views/HelpView'

import OrderView from '../views/OrderView'
import OrderHistory from '../views/OrderHistory'

import PoolMining from '../views/PoolMining'
import SoloMining from '../views/SoloMining'
import StartView from '../views/StartView'
import StatsView from '../views/StatsView'

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/admin',
        component: AdminView,
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
        path: '/order',
        component: OrderView,
    },
    {
        path: '/order/history',
        component: OrderHistory,
    },

    {
        path: '/pool',
        component: PoolMining,
    },
    {
        path: '/solo',
        component: SoloMining,
    },
    {
        path: '/start',
        component: StartView,
    },
    {
        path: '/stats',
        component: StatsView,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
