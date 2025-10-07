import { defineNuxtConfig } from "nuxt"

export default defineNuxtConfig({
  modules: ["@nuxt/ui"],

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  colorMode: {
    preference: "dark",
  },

  compatibilityDate: "2025-01-07",
})
