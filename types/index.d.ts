declare module "nuxt/schema" {
  type RuntimeConfig = {
    nodeEnv: string;
    sentryAuthToken: string;
    auth: {
      betterAuthSecret: string;
      githubClientSecret: string;
      googleClientSecret: string;
    };
    db: {
      devUrl: string;
      turso: {
        url: string;
        authToken: string;
      };
    };
  };
  type PublicRuntimeConfig = {
    sentryDsn: string;
    auth: {
      betterAuthUrl: string;
      githubClientId: string;
      googleClientId: string;
    };
  };
}

export {};
