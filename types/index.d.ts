declare module "nuxt/schema" {
  type RuntimeConfig = {
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
    baseUrl: string;
    auth: {
      githubClientId: string;
      googleClientId: string;
    };
  };
}

export {};
