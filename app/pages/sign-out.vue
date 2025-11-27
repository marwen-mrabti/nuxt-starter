<script lang="ts" setup>
import { useAuthStore } from "~/store/auth-store";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signOut();
});
</script>

<template>
  <div
    class="h-[calc(100dvh-10rem)] w-full bg-linear-to-br from-background via-card to-background flex items-center justify-center my-auto mx-auto"
  >
    <div class="relative">
      <!-- Animated background circles -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="size-32 rounded-full bg-primary/20 animate-ping"
          style="animation-duration: 2s"
        />
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="size-24 rounded-full bg-accent/20 animate-ping"
          style="animation-duration: 1.5s; animation-delay: 0.3s"
        />
      </div>

      <!-- Main content card -->
      <div
        class="relative bg-card/80 backdrop-blur-xl rounded-xl shadow-2xl p-12 border border-border max-w-md"
      >
        <div class="flex flex-col items-center gap-6">
          <!-- Spinner -->
          <div class="relative">
            <div
              class="size-20 rounded-full border-4 border-muted border-t-primary animate-spin"
            />
            <div
              class="absolute inset-0 size-20 rounded-full border-4 border-transparent border-r-accent animate-spin"
              style="animation-duration: 1.5s; animation-direction: reverse"
            />
          </div>

          <!-- Text content -->
          <div class="space-y-2 text-center">
            <h2 class="text-2xl font-bold text-foreground">
              Logging out...
            </h2>
            <p class="text-muted-foreground text-sm">
              Securing your session
            </p>
          </div>

          <!-- Progress dots -->
          <div class="flex gap-2">
            <div class="size-2 rounded-full bg-primary animate-pulse" />
            <div
              class="size-2 rounded-full bg-primary animate-pulse"
              style="animation-delay: 0.2s"
            />
            <div
              class="size-2 rounded-full bg-primary animate-pulse"
              style="animation-delay: 0.4s"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
