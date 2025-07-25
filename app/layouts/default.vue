<template>
  <div class="relative isolate container mx-auto max-w-7xl">
    <header
      class="sticky top-0 z-50 flex w-full items-center justify-between px-4 py-2"
    >
      <NuxtLink
        to="/"
        class="mr-auto"
        prefetch-on="interaction"
      >
        <h2>
          <span class="text-primary text-2xl font-bold">home</span>
        </h2>
      </NuxtLink>
    </header>
    <main class="flex flex-1 flex-col items-center justify-center py-4">
      <slot />
    </main>
  </div>
</template>
