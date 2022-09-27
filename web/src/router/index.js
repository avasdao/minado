import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView'

import AdminView from '../views/AdminView'
import CloudMining from '../views/CloudMining'
import HelpView from '../views/HelpView'

import OrderView from '../views/OrderView'
import OrderCheckout from '../views/OrderCheckout'
import OrderHistory from '../views/OrderHistory'
import OrderPending from '../views/OrderPending'
import OrderQueue from '../views/OrderQueue'

import MinersDetail from '../views/MinersDetail'

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
        path: '/order/checkout',
        component: OrderCheckout,
    },
    {
        path: '/order/history',
        component: OrderHistory,
    },
    {
        path: '/order/pending',
        component: OrderPending,
    },
    {
        path: '/queue',
        component: OrderQueue,
    },

    {
        path: '/miners/:minerid',
        component: MinersDetail,
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
    history: createWebHistory(),
    routes,
})

export default router
