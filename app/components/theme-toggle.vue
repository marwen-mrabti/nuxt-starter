<script setup lang="ts">
import type { ThemeOption } from "~~/shared/constants";

import { themeOptions } from "~~/shared/constants";

function iconName(theme: ThemeOption) {
  if (theme === "system")
    return "i-ph-laptop";
  if (theme === "light")
    return "i-ph-sun";
  if (theme === "dark")
    return "i-ph-moon";
  return "i-ph-coffee";
}
</script>

<template>
  <div>
    <ul class="theme-toggle m-0 flex list-none gap-4 p-0">
      <li
        v-for="theme of themeOptions"
        :key="theme"
        class="cursor-pointer rounded-full p-2 transition-all duration-200 hover:brightness-110"
        :class="{
          preferred: !$colorMode.unknown && theme === $colorMode.preference,
          selected: !$colorMode.unknown && theme === $colorMode.value,
        }"
      >
        <Icon
          :name="iconName(theme)"
          class="size-6"
          :class="{
            'text-foreground size-8 font-extrabold opacity-100':
              theme === $colorMode.value,
            'text-muted-foreground font-medium opacity-60':
              theme !== $colorMode.value,
          }"
          @click="$colorMode.preference = theme"
        />
      </li>
    </ul>
  </div>
</template>
