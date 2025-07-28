<script setup lang="ts">
import { useAuthStore } from "~/store/auth-store";

const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="relative isolate container mx-auto max-w-7xl">
    <div class="min-h-screen w-full bg-[#e4dede] relative">
      <div
        class="absolute inset-0 z-0 pointer-events-none"
        :style="{
          backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
          backgroundSize: '32px 32px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)',
        }"
      />
      <header
        class="sticky top-0 z-50 flex w-full items-center justify-between px-4 py-2"
      >
        <NuxtLink
          to="/"
          class="mr-auto"
          prefetch-on="interaction"
          replace
        >
          <h2>
            <span class="text-primary text-2xl font-bold">home</span>
          </h2>
        </NuxtLink>
        <div class="flex items-center gap-4">
          <UserButton />
        </div>
      </header>
      <main class="flex flex-1 flex-col items-center justify-center py-4">
        <slot />
      </main>
    </div>
  </div>
</template>
