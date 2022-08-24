export default {
    items: [{
        name: 'Home',
        url: '/home',
        icon: 'icon-grid'
    }, {
        name: 'My Foremen',
        url: '/foremen',
        icon: 'fa fa-industry'
        // icon: 'icon-energy'
    }, {
        name: 'My Payouts',
        url: '/payouts',
        icon: 'fa fa-usd'

// Community
    }, {
        divider: true
    }, {
        title: true,
        name: 'Community'
    // }, {
    //     name: 'InfinityPool',
    //     url: '/infinitypool',
    //     icon: 'icon-layers'
    // }, {
    //     name: 'InfinityWell',
    //     url: '/infinitywell',
    //     icon: 'icon-present',
    //     // variant: 'info',
    //     badge: {
    //         variant: 'warning',
    //         text: 'DEMO'
    //     }
    }, {
        name: 'Rewards',
        url: '/rewards',
        icon: 'icon-present'
    }, {
        name: `Notebook`,
        url: '/notebook',
        icon: 'icon-info'

// Mineables
    }, {
        divider: true
    }, {
        title: true,
        name: 'Mineables'
    }, {
        name: '0xBitcoin Token',
        url: '/0xBTC',
        icon: 'icon-chart'
    }, {
        name: 'ZeroGold',
        url: '/0GOLD',
        icon: 'icon-chart',
        // variant: 'warning',
        badge: {
            variant: 'warning',
            text: 'NEW'
        }
    }]
}
