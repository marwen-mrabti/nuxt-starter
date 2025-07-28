<script setup>
import { useAuthStore } from "~/store/auth-store";

useHead({
  title: "Sign In",
  meta: [
    { name: "description", content: "Sign in to your account" },
  ],
});
const authStore = useAuthStore();
const { pending } = storeToRefs(authStore);
</script>

<template>
  <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg
            class="w-8 h-8 text-white"
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
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Welcome back! Please sign in to continue
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white space-y-4 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <AuthButton
          label="Continue with Google"
          icon="tabler:brand-google-filled"
          :loading="pending"
          :disabled="pending"
          class="bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 "
          loading-text="Signing in..."
          @click="() => authStore.signIn({ provider: 'google' })"
        />
        <AuthButton
          label="Continue with GitHub"
          icon="tabler:brand-github"
          :loading="pending"
          :disabled="pending"
          class=" bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 "
          loading-text="Signing in..."
          @click="() => authStore.signIn({ provider: 'github' })"
        />
      </div>
    </div>
  </div>
</template>
