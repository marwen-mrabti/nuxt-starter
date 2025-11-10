<script setup lang="ts">
const colorMode = useColorMode();
const colorModes = ["light", "dark", "sepia"];

function toggleTheme(event: Event) {
  const theme = (event.target as HTMLSelectElement).value;
  if (!document.startViewTransition) {
    console.error("View transitions not supported");
    colorMode.preference = theme;
  }
  document.startViewTransition(() => {
    colorMode.preference = theme;
  });
}
</script>

<template>
  <div>
    <select
      class="text-card-foreground bg-card"
      :value="colorMode.preference"
      @change="(event) => toggleTheme(event)"
    >
      <option v-for="mode in colorModes" :key="mode" :value="mode">
        {{ mode }}
      </option>
    </select>
  </div>
</template>
