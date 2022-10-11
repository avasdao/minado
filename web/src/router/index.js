import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView'

import AdminView from '../views/AdminView'
import CloudMining from '../views/CloudMining'
import GuaranteeView from '../views/GuaranteeView'
import HelpView from '../views/HelpView'

import OrderView from '../views/OrderView'
import OrderCheckout from '../views/OrderCheckout'
import OrderHistory from '../views/OrderHistory'
import OrderPending from '../views/OrderPending'
import OrderQueue from '../views/OrderQueue'

import MinersDetail from '../views/MinersDetail'

import PoolMining from '../views/PoolMining'
import ProfileManager from '../views/ProfileManager'
import ReferralManager from '../views/ReferralManager'
import RefundView from '../views/RefundView'
import SoloMining from '../views/SoloMining'
import StartView from '../views/StartView'
import StatsView from '../views/StatsView'
import TransparencyView from '../views/TransparencyView'

import AppHandler from '../AppHandler'

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
        path: '/admin/:profileid',
        component: AdminView,
    },

    {
        path: '/cloud',
        component: CloudMining,
    },
    {
        path: '/guarantee',
        component: GuaranteeView,
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
        path: '/profile',
        component: ProfileManager,
    },
    {
        path: '/referrals',
        component: ReferralManager,
    },
    {
        path: '/refund',
        component: RefundView,
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
    {
        path: '/transparency',
        component: TransparencyView,
    },
    {
        path: '/:shortcutid',
        component: AppHandler,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
