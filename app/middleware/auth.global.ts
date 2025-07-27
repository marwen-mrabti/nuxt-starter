import { AUTHED_ROUTES } from "@@/shared/constants";

import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const session = await authClient.useSession(useFetch);
  const user = session.data.value?.user;

  if (AUTHED_ROUTES.has(String(to.path))) {
    if (!user) {
      return navigateTo("/");
    }
  }
});
