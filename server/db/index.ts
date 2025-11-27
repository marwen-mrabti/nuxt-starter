import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const config = useRuntimeConfig();
// Create connection config based on environment

const connectionConfig = {
  url: config.db.turso.url!,
  authToken: config.db.turso.authToken!,
};

const db = drizzle({
  connection: connectionConfig,
  casing: "snake_case",
  schema,
});

export default db;
