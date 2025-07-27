/* eslint-disable node/no-process-env */
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/db/migrations",
  schema: "./server/db/schema/index.ts",
  casing: "snake_case",
  dialect: "turso",
  dbCredentials: {
    url: process.env.NODE_ENV === "development"
      ? process.env.DEV_DB_URL || "file:./dev.db"
      : process.env.TURSO_DATABASE_URL!,
    authToken: process.env.NODE_ENV === "development"
      ? undefined
      : process.env.TURSO_AUTH_TOKEN!,
  },
});
