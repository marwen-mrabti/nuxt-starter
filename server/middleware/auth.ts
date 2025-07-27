import type { T_User } from "~~/server/db/schema";

import { auth } from "~~/server/lib/auth";
import { AUTHED_ROUTES } from "~~/shared/constants";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  // Attach the user to the event context
  event.context.user = session?.user as unknown as T_User;

  if (AUTHED_ROUTES.has(String(event.path))) {
    if (!session?.user) {
      await sendRedirect(event, "/", 301);
    }
  }
});
