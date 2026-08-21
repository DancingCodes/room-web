const apiBase = process.env.NUXT_PUBLIC_API_BASE ?? 'https://room.moonc.love/api/v1/app'

export default defineNuxtConfig({
  ssr: true,
  css: ['~/assets/scss/main.scss'],
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
      apiBase,
    },
  },
  site: {
    url: 'https://roomweb.moonc.love',
    name: '星闪',
  },
  nitro: {
    prerender: {
      routes: ['/', '/privacy', '/terms'],
    },
  },
  compatibilityDate: '2026-08-21',
})
