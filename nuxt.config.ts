import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  css: [
    "assets/css/main.css"
  ],


  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          "postcss-import": {},
          "tailwindcss/nesting": {},
          "tailwindcss": {},
          "autoprefixer": {},
        },
      }
    }
  }
})
