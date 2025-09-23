// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@compodium/nuxt',
    '@pinia/nuxt',
    'nuxt-typed-router',
    '@regle/nuxt',
  ],
  supabase: {
    key: process.env.SUPABASE_KEY,
    url: process.env.SUPABASE_URL,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/login', '/register', '/confirm'],
      cookieRedirect: false,
      saveRedirectToCookie: false
    }
  },
  runtimeConfig: {
    public: {
      version: '1.0.0'
    },

  }
})