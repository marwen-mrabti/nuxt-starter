import { AUTHED_ROUTES } from "@@/shared/constants";

import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const session = await authClient.useSession(useFetch);
  const user = session.data.value?.user;

  const currentPath = String(to.path);

  // Handle sign-in page
  if (currentPath === "/sign-in") {
    if (user) {
      return navigateTo("/dashboard");
    }
    return;
  }

  // Handle protected routes
  if (AUTHED_ROUTES.has(currentPath)) {
    if (!user) {
      return navigateTo("/sign-in");
    }
  }
});
