import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DEV_DB_URL: z.string().default("file:./dev.db"),
  TURSO_DATABASE_URL: z.string("Turso database URL must be a valid").nonempty().optional(),
  TURSO_AUTH_TOKEN: z.string().nonempty().optional(),
  BETTER_AUTH_SECRET: z.string().nonempty().min(32, "BETTER_AUTH_SECRET must be at least 32 characters long"),
  BETTER_AUTH_URL: z.url().nonempty(),
  AUTH_GITHUB_CLIENT_ID: z.string().nonempty(),
  AUTH_GITHUB_CLIENT_SECRET: z.string().nonempty(),
  NUXT_PUBLIC_SENTRY_DSN: z.url("Sentry DSN must be a valid URL").optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
});

export type T_EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
