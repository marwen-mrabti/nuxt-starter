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
    class="border-border flex w-full items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-bold shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
      class="border-invert h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
    />
  </button>
</template>
