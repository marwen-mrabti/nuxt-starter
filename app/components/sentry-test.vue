<script setup lang='ts'>
import * as Sentry from "@sentry/nuxt";

function triggerClientError() {
  try {
    // console.log("Triggering client error...");
    throw createError({
      statusCode: 500,
      message: "This is a client-side error! sentry test",
    });
  }
  catch (err) {
    console.error("Client error caught:", err);
    Sentry.captureException(err);
  }
}
</script>

<template>
  <button
    id="errorBtn"
    class="mt-4 rounded bg-red-500 px-4 py-2 text-white"
    @click="triggerClientError"
  >
    Throw Client Error
  </button>
</template>
