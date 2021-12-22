require('dotenv').config()

module.exports = {
  ssr: false,
  telemetry: false,
  server: {
    port: process.env.PORT || '3000',
    host: process.env.HOST || 'localhost',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Schools.vn',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/logo.jpg' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
      },
    ],
  },

  //Auto import components
  components: [{ path: '~/components/common/' }, { path: '~/components/tailwind/', prefix: 't' }],

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/css/normalize.css', '~assets/css/app.css', '~assets/css/custom.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/i18n.js',
    '~plugins/vue-inject.js',
    '~plugins/axios.js',
    '~plugins/lodash',
    '~plugins/axiosMiniGame.js',
    '~plugins/ms-api.js',
    '~plugins/filter.js',
    '~plugins/directive.js',
    '~plugins/nuxt-client-init.js',
    '~plugins/plugin.js',
    '~plugins/skeleton.js',
    // '~plugins/hot-jar.js',
    { src: '~plugins/hotjar.js', mode: 'client' },
    { src: '~plugins/notification.js', mode: 'client' },
    { src: '~plugins/confirm.js', mode: 'client' },
  ],
  router: {
    linkActiveClass: 'ms-active',
    linkExactActiveClass: 'ms-exact-active',
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg-sprite',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    '@nuxtjs/sentry',
    '@nuxtjs/toast',
    '@nuxtjs/firebase',
  ],

  toast: {
    singleton: true,
    position: 'top-center',
    duration: 3000,
    containerClass: 'mt-8',
  },
  /**
   * Sentry configuration
   */
  sentry: {
    dsn: 'https://9b271fccb46344a0a601c684de34bf7c@o510320.ingest.sentry.io/5605862',
    config: {
      publishRelease: true,
      sourceMapStyle: 'source-map',
      attachCommits: true,
    },
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src',
        },
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },

  firebase: {
    services: {
      analytics: true,
    },
  },

  publicRuntimeConfig: () => ({
    brandSite: process.env.BRAND_SITE,
    ybmSite: process.env.YBM_SITE,
    apiEndpoint: process.env.HTTP_ENDPOINT,
    miniGameEndpoint: process.env.API_MINIGAME_URL,
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  }),
}
