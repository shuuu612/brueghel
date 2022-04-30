export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Brueghel | 画像変換ツール',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Web制作者向けの画像変換サイトです。WebPへの変換にも対応しております。' },
      { hid: 'keywords', name: 'keywords', content: 'web,jpeg,png,gif,webp,avif' },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicons/icon-192x192.png' },
      { rel: 'apple-touch-icon', type: 'image/png', href: '/favicons/apple-touch-icon-180x180.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/ress.scss',
    '@/assets/scss/common.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/constants.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/dev/': { target: 'https://0nw778k56a.execute-api.ap-northeast-1.amazonaws.com' }
  },

  styleResources: {
    scss: [
      '@/assets/scss/mixin.scss',
      '@/assets/scss/font.scss',
      '@/assets/scss/color.scss',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production"
        }
      }
    },
  },

  generate: {
    interval: 300,
  },

  loading: false,
}
