export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nexa Rocks! Solo, Pool & Cloud Mining NEXA Assets',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The premier NEXA mining pool offering solo, pool & cloud mining for ALL Nexa assets.' },
      { name: 'format-detection', content: 'telephone=no' },

      // Open graph
      {
        vmid: 'og:url',
        property: 'og:url',
        content: 'https://nexa.rocks',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Nexa Rocks!',
      },
      {
        vmid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'The premier NEXA mining pool offering solo, pool & cloud mining for ALL Nexa assets.',
      },
      {
        vmid: 'og:image',
        property: 'og:image',
        content: 'poster.jpg?1665846493',
      },

      // Twitter
      {
        vmid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        vmid: 'twitter:title',
        property: 'twitter:title',
        content: 'Nexa Rocks!'
      },
      {
        vmid: 'twitter:description',
        property: 'twitter:description',
        content: 'The premier NEXA mining pool offering solo, pool & cloud mining for ALL Nexa assets.'
      },
      {
        vmid: 'twitter:image',
        property: 'twitter:image',
        content: 'poster.jpg?1665846493'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/nuxt-highcharts
    'nuxt-highcharts',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // https://www.npmjs.com/package/nuxt-highcharts
  highcharts: {
    /* module options */
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
