<script setup>
import { useAuthStore } from "~/store/auth-store";

defineOgImageComponent();
useHead({
  title: "Sign In",
  meta: [{ name: "description", content: "Sign in to your account" }],
});

const authStore = useAuthStore();
const { pending } = storeToRefs(authStore);
</script>

<template>
  <div class="bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div
          class="bg-primary flex h-12 w-12 items-center justify-center rounded-lg"
        >
          <svg
            class="text-primary-foreground h-8 w-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <h2 class="text-foreground mt-6 text-center text-3xl font-extrabold">
        Sign in to your account
      </h2>
      <p class="text-muted-foreground mt-2 text-center text-sm">
        Welcome back! Please sign in to continue
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-card space-y-4 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <AuthButton
          label="Continue with Google"
          icon="tabler:brand-google-filled"
          :loading="pending"
          :disabled="pending"
          class="bg-card/70 text-card-foreground hover:bg-card/80 focus:ring-ring"
          loading-text="Signing in..."
          @click="() => authStore.signIn({ provider: 'google' })"
        />
        <AuthButton
          label="Continue with GitHub"
          icon="tabler:brand-github"
          :loading="pending"
          :disabled="pending"
          class="bg-accent-foreground/10 text-foreground hover:bg-accent-foreground/20 focus:ring-ring"
          loading-text="Signing in..."
          @click="() => authStore.signIn({ provider: 'github' })"
        />
      </div>
    </div>
  </div>
</template>
