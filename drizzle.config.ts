/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  out: "./server/db/migrations",
  schema: "./server/db/schema/index.ts",
  casing: "snake_case",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
