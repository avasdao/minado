export default () => ({
    searchAddress: null,
    notifs: null,

    panelTab: null,
    panelMetadata: null,
    isPanelOpen: false,
    isPanelVisible: false,

    nexUsd: 1.0000, // DEPRECATED
    nexCap: 0, // source: https://coinmarketcap.com/?page=10 (top 1000 coins)
    rpm: 42.857142857, // rpm = rocks per month = (# of immature coins X 30 / 7 / # of miners)
    rocksUsd: 0.058823529 // DEPRECATED
})
