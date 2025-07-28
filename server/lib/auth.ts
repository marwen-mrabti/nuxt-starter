import db from "@@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/plugins";

const config = useRuntimeConfig();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),

  // Base URL for auth endpoints
  baseURL: config.public.auth.betterAuthUrl,
  // Secret for signing tokens
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

  // Rate limiting
  rateLimit: {
    window: 60, // 1 minute
    max: 100, // 100 requests per minute
    storage: "database", // Use "database" for production with multiple instances
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

  // Logging
  logger: {
    level: config.nodeEnv === "development" ? "debug" : "error",
    disabled: false,
  },
});
