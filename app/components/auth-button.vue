<script lang="ts" setup>
type Props = {
  label: string;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  class?: string;
  iconSize?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  icon: "",
  loading: false,
  disabled: false,
  loadingText: "",
  class: "",
  iconSize: "24",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
}

const displayText = computed(() => {
  if (props.loading && props.loadingText) {
    return props.loadingText;
  }
  return props.label;
});
</script>

<template>
  <button
    :disabled="disabled || loading"
    class="w-full flex justify-center items-center gap-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    :class="[props.class]"
    @click="handleClick"
  >
    <Icon
      v-show="icon && !loading"
      :name="icon"
      :size="iconSize"
    />
    <span>
      {{ displayText }}
    </span>

    <span
      v-show="loading"
      class="w-6 h-6 border-2 border-invert border-t-transparent rounded-full animate-spin"
    />
  </button>
</template>
