// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
const storeVersion = require("./package.json").version;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  image: {
    inject: true,
    quality: 80,
    format: ['webp']
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false
    },
    {
      path: "~/views",
      pathPrefix: false
    }
  ],
  imports: {
    dirs: ["store", "types", "utils"],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      appVersion: storeVersion,
      firebase_apiKey: process.env.NUXT_FIREBASE_API_KEY || "",
      firebase_authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN || "",
      firebase_databaseURL: process.env.NUXT_FIREBASE_DATABASE_URL || "",
      firebase_projectId: process.env.NUXT_FIREBASE_PROJECT_ID || "",
      firebase_storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET || "",
      firebase_messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID || "",
      firebase_appId: process.env.NUXT_FIREBASE_APP_ID || "",
      firebase_measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID || "",
    }
  }
})
