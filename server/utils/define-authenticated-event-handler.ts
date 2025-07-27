import type { T_User } from "~~/server/db/schema";
import type { H3Event, H3EventContext } from "h3";

type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: T_User;
  };
};

export default function defineAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "User is not authenticated",
      });
    }
    // If the user is authenticated, proceed with the handler
    return handler(event as AuthenticatedEvent);
  });
}
