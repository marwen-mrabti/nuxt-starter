import * as Sentry from "@sentry/nuxt";

import env from "./shared/env";

Sentry.init({
  // If set up, you can use your runtime config here
  // dsn: useRuntimeConfig().public.sentry.dsn,
  dsn: env.NUXT_PUBLIC_SENTRY_DSN,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Integrations to use
  integrations: [
    Sentry.replayIntegration(),
    Sentry.vueIntegration({
      tracingOptions: {
        trackComponents: true,
        timeout: 500, // milliseconds
      },
    }),
  ],

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false, // Boolean(env.NODE_ENV === "development"),
});
