export default () => ({
    searchAddress: null,
    notifs: null,

    panelTab: null,
    panelMetadata: null,
    isPanelOpen: false,
    isPanelVisible: false,

    nexUsd: 0.00, // source: https://api.telr.io/v1/ticker/quote/NEX
    nexCap: 0, // source: https://coinmarketcap.com/
    rpm: 42.857142857, // rpm = rocks per month = (# of immature coins X 30 / 7 / # of miners)
    rocksUsd: 0.058823529 // DEPRECATED
})
