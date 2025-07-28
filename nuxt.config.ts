/* eslint-disable node/no-process-env */
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

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
    "@sentry/nuxt/module",
    "@pinia/nuxt",
  ],

  runtimeConfig: {
    // Private keys (server-only)
    nodeEnv: process.env.NODE_ENV || "development",
    sentryAuthToken: process.env.SENTRY_AUTH_TOKEN,
    auth: {
      betterAuthSecret: process.env.BETTER_AUTH_SECRET,
      githubClientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
      googleClientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    },
    db: {
      devUrl: process.env.DEV_DB_URL || "file:./dev.db",
      turso: {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      },
    },

    // Public keys (available on client)
    public: {
      baseUrl: process.env.BASE_URL,
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
      auth: {
        githubClientId: process.env.AUTH_GITHUB_CLIENT_ID,
        googleClientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      },
    },
  },

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

  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    },

    autoInjectServerSentry: "top-level-import",
  },

  sourcemap: {
    client: "hidden",
  },
});
