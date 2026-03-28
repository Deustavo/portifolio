// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Gustavo Andrade — Software Engineer',
      meta: [
        { name: 'description', content: 'Portfolio of Gustavo Andrade, Software Engineer and Front-end Specialist' },
        { property: 'og:title', content: 'Gustavo Andrade — Software Engineer' },
        { property: 'og:description', content: 'Portfolio of Gustavo Andrade, Software Engineer and Front-end Specialist' },
        { property: 'og:image', content: '/logo.svg' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo_light.svg', media: '(prefers-color-scheme: dark)' },
      ],
    },
  },
})
