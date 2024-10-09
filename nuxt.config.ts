export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  }
})
