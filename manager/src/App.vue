<template>
    <router-view></router-view>
</template>

<script>
/* Import modules. */
import SockJS from 'sockjs-client'

/* Import libraries. */
const ethers = require('ethers')
const EventEmitter = require('events')

/* Import local libraries. */
const utils = require('@/_utils')

/* Initialize constants. */
const MINADO_NETWORK_URL = 'http://asia.minado.network'
const PJSON = require('../package.json')

export default {
    data: () => ({
        haidi: null
    }),
    computed: {
        //
    },
    methods: {
        /**
         * Initialize Haidi
         */
        initHaidi () {
            /* Initialize (Class) Haidi. */
            class Haidi extends EventEmitter {}

            /* Initialize a new Haidi instance. */
            this.haidi = new Haidi()

            /* Save the WebSocket to the store. */
            this.$store.dispatch('setHaidi', this.haidi)

            this.haidi.emit('welcome')
        },

        /**
         * Initialize WebSocket
         */
        initWs () {
            /* Initialize primary web socket connection. */
            const ws = new SockJS(MINADO_NETWORK_URL)

            // console.log('ws', ws)

            /* Save the WebSocket to the store. */
            this.$store.dispatch('setWebSocket', ws)

            /* Handle WebSocket ERRORS. */
            ws.onerror = (_err) => {
                console.error('Oh no! WebSocket has a problem:', _err)

                this.haidi.emit('error', _err)
            }

            /* Handle WebSocket OPEN. */
            ws.onopen = () => {
                console.log(`

            ) ) )                     ) ) )
          ( ( (                      ( ( (
        ) ) )                       ) ) )
      (~~~~~~~~~)                 (~~~~~~~~~)
      | MINADO |                  | MINING |
      |        |                  |        |
      I      _._                  I       _._
      I    /'   '\\                I     /'   '\\
      I   |   Ξ   |               I    |   Ξ   |
      f   |   |~~~~~~~~~~~~~~|    f    |    |~~~~~~~~~~~~~~|
    .'    |   | |~~~~~~~~|   |  .'     |    | |~~~~~~~~|   |
  /'______|___|_|__¢¢¢___|___|/'_______|____|_|__¢¢¢___|___|

  MINADO v${PJSON.version} — Connection established to Minado.Network
                `);

                // TODO Send Ethereum address for AUTH

                /* Build package. */
                const pkg = {
                    client: 'web',
                    version: 'latest'
                }

                /* Send package to server. */
                ws.send(JSON.stringify(pkg))

                this.haidi.emit('connected')
            }

            /* Handle WebSocket MESSAGES. */
            ws.onmessage = (_e) => {
                console.log('Incoming message:', _e.data)

                this.haidi.emit('message', _e.data)

                this.$store.dispatch('addNetworkReport', _e.data)
            }

            /* Handle WebSocket CLOSE. */
            ws.onclose = () => {
                console.log('Connection closed.')

                this.haidi.emit('disconnected')

                /* Attempt re-connection. */
                utils.reconnect(this.initWs)
            }
        },
    },
    mounted: function () {
        /* Initialize Haidi (Bot). */
        this.initHaidi()

        /* Initialize WebSocket. */
        this.initWs()
    }
}
</script>

<style lang="scss">
// CoreUI Icons Set
@import '~@coreui/icons/css/coreui-icons.min.css';

/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';

/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';

/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';

/* Import Bootstrap Vue Styles */
@import '~bootstrap-vue/dist/bootstrap-vue.css';

// Import Main styles for this application
@import 'assets/scss/style';
</style>
