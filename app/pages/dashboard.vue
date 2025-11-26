<script setup lang="ts">
useHead({
  title: "Dashboard",
});
defineOgImageComponent("Nuxt", {
  title: "Nuxt Starter | Dashboard",
  description: "Private dashboard page",
  theme: "#01aa00",
  colorMode: "system",
});
</script>

<template>
  <div>
    <h1>Dashboard is a private route</h1>
  </div>
</template>
