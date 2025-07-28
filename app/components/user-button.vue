<script lang="ts" setup>
import { useAuthStore } from "~/store/auth-store";

const authStore = useAuthStore();
const { user, pending } = storeToRefs(authStore);
</script>

<template>
  <div v-if="!pending && user" class="flex items-center gap-4">
    <div class="group relative">
      <div
        tabindex="0"
        class="cursor-pointer rounded-full border-2 border-blue-500"
      >
        <div v-if="!!user?.image" class="h-12 w-12">
          <button class="h-12 w-12 overflow-hidden rounded-full">
            <img
              v-if="user?.image"
              :src="user.image"
              :alt="user.name"
              class="h-full w-full rounded-full object-cover"
            >
            <div v-else class="uppercase">
              {{ user.name.chartAt(0) }}
            </div>
          </button>
        </div>
        <div
          v-else
          class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-600 text-white"
        >
          <span class="text-sm font-medium">{{
            user.name.charAt(0).toUpperCase()
          }}</span>
        </div>
      </div>

      <!-- Dropdown Menu -->
      <ul
        class="invisible absolute top-full right-0 z-50 mt-2 w-52 rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
      >
        <li>
          <NuxtLink
            to="/sign-out"
            class="flex w-full items-center justify-between px-4 py-2 text-gray-700 transition-colors duration-150 hover:bg-gray-100"
          >
            Sign Out
            <Icon name="tabler:logout-2" size="24" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/dashboard"
            class="flex w-full items-center justify-between px-4 py-2 text-gray-700 transition-colors duration-150 hover:bg-gray-100"
          >
            Dashboard
            <Icon name="tabler:dashboard" size="24" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <NuxtLink
    v-else
    :disabled="pending"
    to="/sign-in"
    class="flex items-center gap-1 text-gray-700 transition-colors duration-200 hover:text-gray-900"
  >
    <Icon name="tabler:login-2" size="24" />
    Sign In
  </NuxtLink>
</template>
