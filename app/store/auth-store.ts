import type { T_User } from "~~/server/db/schema";

import { authClient } from "~/lib/auth-client";

export const useAuthStore = defineStore("auth-store", () => {
  const session = useState<Awaited<
    ReturnType<typeof authClient.getSession>
  > | null>("session", () => null);

  async function init() {
    const userSession = await authClient.useSession(useFetch);
    session.value = userSession;
    return userSession;
  }

  const user = computed(() => session.value?.data?.user as T_User | null);
  const pending = computed(() => session.value?.pending ?? false);

  async function signIn({ provider }: { provider: "github" | "google" }) {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signIn.social({
      provider,
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
