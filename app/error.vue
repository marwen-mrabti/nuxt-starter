<script setup lang="ts">
type ErrorProps = {
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
    stack?: string;
    data?: any;
    url?: string;
    [key: string]: any;
  };
};

const props = defineProps<ErrorProps>();
const router = useRouter();
// Check if we're in development mode
const isDev = import.meta.dev;

// Compute additional error information for dev mode
const additionalErrorInfo = computed(() => {
  const excluded = ["statusCode", "statusMessage", "message", "stack", "data", "url"];
  const additional: Record<string, any> = {};

  Object.keys(props.error).forEach((key) => {
    if (!excluded.includes(key) && props.error[key] !== undefined) {
      additional[key] = props.error[key];
    }
  });

  return additional;
});

// Get appropriate error title based on status code
function getErrorTitle(): string {
  const statusCode = props.error.statusCode;

  if (statusCode) {
    const statusMessages: Record<number, string> = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Page Not Found",
      405: "Method Not Allowed",
      408: "Request Timeout",
      410: "Gone",
      422: "Unprocessable Entity",
      429: "Too Many Requests",
      500: "Internal Server Error",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
    };

    return statusMessages[statusCode] || `HTTP ${statusCode} Error`;
  }

  return "Something went wrong";
}

// Get user-friendly error message
function getErrorMessage(): string {
  const statusCode = props.error.statusCode;

  if (props.error.statusMessage) {
    return props.error.statusMessage;
  }

  if (statusCode) {
    const messages: Record<number, string> = {
      400: "The request was invalid or cannot be served. Please check your input and try again.",
      401: "You need to be authenticated to access this resource. Please log in and try again.",
      403: "You don't have permission to access this resource.",
      404: "The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.",
      405: "The requested method is not allowed for this resource.",
      408: "The request took too long to complete. Please try again.",
      410: "The resource you're looking for is no longer available.",
      422: "The request was well-formed but contains invalid data.",
      429: "Too many requests have been made. Please wait a moment and try again.",
      500: "We're experiencing some technical difficulties. Our team has been notified and is working to fix this.",
      502: "We're having trouble connecting to our servers. Please try again in a few moments.",
      503: "The service is temporarily unavailable. Please try again later.",
      504: "The server took too long to respond. Please try again.",
    };

    return messages[statusCode] || "An unexpected error occurred. Please try again later.";
  }

  return props.error.message || "An unexpected error occurred. Please try again later.";
}

// Navigation methods
function goBack(): void {
  if (window.history.length > 1) {
    router.back();
  }
  else {
    navigateTo("/");
  }
}

function goHome(): void {
  navigateTo("/");
}

function reload(): void {
  window.location.reload();
}

// Set page meta
useHead({
  title: `${props.error.statusCode || "Error"} - ${getErrorTitle()}`,
  meta: [
    { name: "robots", content: "noindex, nofollow" },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full">
      <!-- Main Error Card -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Header -->
        <div class="bg-red-50 dark:bg-red-900/20 px-8 py-6 border-b border-red-100 dark:border-red-800/30">
          <div class="w-full flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <svg
                  class="w-6 h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            <div class="!ml-2 ">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ error.statusCode || 'Error' }}
              </h1>
              <p class="text-red-600 dark:text-red-400 font-medium">
                {{ getErrorTitle() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="px-8 py-6">
          <div class="space-y-6">
            <!-- Error Message -->
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What happened?
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ getErrorMessage() }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium"
                @click="goBack"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>

              <button
                class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium"
                @click="goHome"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </button>

              <button
                class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium"
                @click="reload"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Development Mode Error Details -->
      <div v-if="isDev && (error.stack || error.data)" class="mt-6">
        <div class="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <div class="bg-yellow-500 px-6 py-3">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-yellow-900 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-semibold text-yellow-900">Development Mode - Error Details</span>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <!-- Error Stack -->
            <div v-if="error.stack">
              <h3 class="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Stack Trace
              </h3>
              <pre class="bg-black rounded-lg p-4 text-xs text-green-400 overflow-x-auto font-mono border border-gray-700">{{ error.stack }}</pre>
            </div>

            <!-- Error Data -->
            <div v-if="error.data">
              <h3 class="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Error Data
              </h3>
              <pre class="bg-black rounded-lg p-4 text-xs text-blue-400 overflow-x-auto font-mono border border-gray-700">{{ JSON.stringify(error.data, null, 2) }}</pre>
            </div>

            <!-- Request Information -->
            <div v-if="error.url">
              <h3 class="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Request URL
              </h3>
              <div class="bg-black rounded-lg p-4 text-xs text-purple-400 font-mono border border-gray-700">
                {{ error.url }}
              </div>
            </div>

            <!-- Additional Error Properties -->
            <div v-if="Object.keys(additionalErrorInfo).length > 0">
              <h3 class="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Additional Information
              </h3>
              <pre class="bg-black rounded-lg p-4 text-xs text-orange-400 overflow-x-auto font-mono border border-gray-700">{{ JSON.stringify(additionalErrorInfo, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
