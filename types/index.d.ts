declare module "nuxt/schema" {
  type RuntimeConfig = {
    nodeEnv: string;
    sentryAuthToken: string;
    // add private keys here...
  };

  type PublicRuntimeConfig = {
    sentryDsn: string;
    baseUrl: string;
    // add public keys here...
  };
}

export {};
