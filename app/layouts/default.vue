<script setup lang="ts">
import { useAuthStore } from "~/store/auth-store";

const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div
    class="bg-background relative isolate container mx-auto w-full max-w-7xl"
  >
    <header
      class="sticky top-0 z-50 flex w-full items-center justify-between px-4 py-2"
    >
      <NuxtLink to="/" class="mr-auto" prefetch-on="interaction" replace>
        <h2>
          <span class="text-primary text-2xl font-bold">home</span>
        </h2>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <LazyClientOnly>
          <ThemeToggle />
          <template #fallback>
            <div class="border-border h-8 w-24 border-1" />
          </template>
        </LazyClientOnly>
        <UserButton />
      </div>
    </header>
    <main class="flex flex-1 flex-col items-center justify-center py-4">
      <slot />
    </main>
  </div>
</template>
