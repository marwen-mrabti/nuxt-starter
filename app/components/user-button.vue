<script lang="ts" setup>
import { useAuthStore } from "~/store/auth-store";

const authStore = useAuthStore();
const { user, pending } = storeToRefs(authStore);
</script>

<template>
  <div v-if="!pending && user" class="flex gap-4 items-center">
    <div class="relative group">
      <div
        tabindex="0"
        class="border-2 border-blue-500 rounded-full cursor-pointer"
      >
        <div v-if="!!user?.image" class="w-12 h-12">
          <button class="w-12 h-12 rounded-full overflow-hidden">
            <img
              :src="user.image"
              :alt="user.name"
              class="w-full h-full object-cover rounded-full"
            >
          </button>
        </div>
        <div v-else class="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center">
          <span class="text-sm font-medium">{{ user.name.charAt(0).toUpperCase() }}</span>
        </div>
      </div>

      <!-- Dropdown Menu -->
      <ul
        class="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
      >
        <li>
          <NuxtLink
            to="/sign-out"
            class="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          >
            Sign Out
            <Icon name="tabler:logout-2" size="24" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/dashboard"
            class="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
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
    class="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors duration-200"
  >
    <Icon name="tabler:login-2" size="24" />
    Sign In
  </NuxtLink>
</template>
