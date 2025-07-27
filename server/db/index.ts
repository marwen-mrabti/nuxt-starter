import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const config = useRuntimeConfig();
const isDev = config.nodeEnv === "development";

// Create connection config based on environment
const connectionConfig = isDev
  ? {
      url: config.db.devUrl,
      authToken: undefined,
    }
  : {
      url: config.db.turso.url!,
      authToken: config.db.turso.authToken!,
    };

const db = drizzle({
  connection: connectionConfig,
  casing: "snake_case",
  schema,
});

export default db;
