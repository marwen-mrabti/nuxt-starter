// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import "./shared/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-api-shield",
    "nuxt-csurf",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system", // light | dark | system
    fallback: "dark",
    classSuffix: "", // produces <html class="dark"> not class="dark-mode"
  },

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  nuxtApiShield: {
    limit: {
      max: 12, // maximum requests per duration time, default is 12/duration
      duration: 108, // duration time in seconds, default is 108 seconds
      ban: 3600, // ban time in seconds, default is 3600 seconds = 1 hour
      // If the request limit is exceeded, the user is banned for this period. During the ban, all requests are blocked with 429.
    },
    delayOnBan: true, // delay every response with +1sec when the user is banned, default is true
    errorMessage: "Slow down! Too many requests.", // error message when the user is banned
    retryAfterHeader: false, // when the user is banned add the Retry-After header to the response, default is false
    log: {
      path: "logs", // path to the log file, every day a new log file will be created, use "" to disable logging
      attempts: 100, // if an IP reach 100 requests, all the requests will be logged, can be used for further analysis or blocking for example with fail2ban, use 0 to disable logging
    },
    routes: [], // specify routes to apply rate limiting to, default is an empty array meaning all routes are protected.
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      "*/15 * * * *": ["shield:clean"], // clean the shield storage every 15 minutes
    },
  },
});
