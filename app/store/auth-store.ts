import type { T_User } from "~~/server/db/schema";

import { authClient } from "~/lib/auth-client";

export const useAuthStore = defineStore("auth-store", () => {
  const session = useState<Awaited<ReturnType<typeof authClient.getSession>> | null>("session", () => null);

  async function init() {
    const userSession = await authClient.useSession(useFetch);
    session.value = userSession;
    return userSession;
  }

  const user = computed(() => session.value?.data?.user ?? null as T_User | null);
  const pending = computed(() => session.value?.pending ?? false);

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    return navigateTo("/");
  }

  return { user, pending, init, signIn, signOut };
});
