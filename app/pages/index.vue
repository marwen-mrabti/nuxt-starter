<script setup lang="ts">
useHead({
  title: "Nuxt Starter",
});
</script>

<template>
  <div class="flex flex-1 w-full flex-col items-center justify-center gap-6">
    <h1 class="text-4xl text-emerald-700">
      Start here
    </h1>
    <button class="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
      build your app
    </button>
    <SentryTest />
  </div>
</template>
