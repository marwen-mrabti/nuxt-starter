import db from "@@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/plugins";

const config = useRuntimeConfig();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),

  baseURL: config.public.baseUrl,
  secret: config.auth.betterAuthSecret,

  // Session configuration
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes cache
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },

  // Cookie configuration
  advanced: {
    cookies: {
      sessionToken: {
        name: "better-auth.session_token",
        attributes: {
          httpOnly: true,
          secure: config.nodeEnv === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
  },

  // Rate limiting to 100 requests per minute
  rateLimit: {
    window: 60,
    max: 100,
    storage: "database", // Use "memory" for in-memory storage (development or "database" for persistent storage (production)
  },

  // Social providers configuration
  socialProviders: {
    github: {
      clientId: config.public.auth.githubClientId,
      clientSecret: config.auth.githubClientSecret,
    },
    google: {
      clientId: config.public.auth.googleClientId,
      clientSecret: config.auth.googleClientSecret,
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },

  // Error handling
  onAPIError: {
    throw: true,
    onError: (error, _ctx) => {
      const err = error as { status?: number; message?: string };
      throw createError({
        statusCode: err.status || 500,
        statusMessage: err.message || "Internal Server Error",
      });
    },
    errorURL: "/error",
  },

  // Logging
  logger: {
    level: config.nodeEnv === "development" ? "debug" : "error",
    disabled: false,
  },
});
