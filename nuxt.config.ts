export default defineNuxtConfig({
  ssr: true,
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/sitemap'],
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/images/logo.png' }],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: '/api/v1',
    },
  },
  site: {
    url: 'https://room.moonc.love',
    name: 'Room',
  },
  nitro: {
    prerender: {
      routes: ['/', '/privacy', '/terms'],
    },
  },
  compatibilityDate: '2026-08-21',
})