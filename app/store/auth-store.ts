import { authClient } from "~/lib/auth-client";

export const useAuthStore = defineStore("auth-store", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(
    null,
  );

  async function init() {
    const userSession = await authClient.useSession(useFetch);
    session.value = userSession;
  }

  const user = computed(() => session.value?.data?.user || null);
  const pending = computed(() => session.value?.isPending || false);

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
