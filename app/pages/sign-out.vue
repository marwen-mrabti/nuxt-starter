<script lang="ts" setup>
import { useAuthStore } from "~/store/auth-store";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signOut();
});
</script>

<template>
  <div
    class="bg-base-300 container mx-auto mt-4 flex min-h-72 w-full flex-col items-center justify-center gap-4 rounded-md text-center shadow-md"
  >
    <span
      class="size-24 animate-spin rounded-full border-2 border-neutral-900 border-t-blue-500 border-r-red-600 border-b-green-600"
    />
  </div>
</template>
