/* eslint-disable node/no-process-env */
import type { ZodObject, ZodRawShape } from "zod";

import { z, ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(EnvSchema: ZodObject<T>, buildEnv: Record<string, string | undefined> = process.env) {
  if (import.meta.server) {
    try {
      const result = EnvSchema.safeParse(buildEnv);
      if (result.success) {
        return result.data;
      }
      else {
        let message = "Missing required values in .env:\n";
        const pretty = z.flattenError(result.error);
        message += pretty;
        const e = new Error(message);
        e.stack = "";
        throw e;
      }
    }
    catch (error) {
      if (error instanceof ZodError) {
        const message = z.prettifyError(error);
        throw new Error(`Environment variable validation failed:\n${message}`);
      }
      if (error instanceof Error) {
        throw new TypeError(`An unexpected error occurred while parsing environment variables:\n${error.message}`);
      }
    }
  }
}
