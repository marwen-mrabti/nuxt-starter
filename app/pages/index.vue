<script setup lang="ts">
defineOgImageComponent("Nuxt", {
  title: "Nuxt Starter",
  description: "nuxt starter with better-auth",
  theme: "#01aa00",
  colorMode: "system",
});
useHead({
  title: "Nuxt Starter",
});
</script>

<template>
  <div class="flex w-full flex-1 flex-col items-center justify-center gap-6">
    <h1 class="text-primary text-4xl">
      Start here
    </h1>
    <p class="text-secondary-foreground text-lg">
      This is a starter template for Nuxt 4 applications.
    </p>
    <p class="text-secondary-foreground text-lg">
      It includes basic routing, authentication, and a layout system.
    </p>
  </div>
</template>
