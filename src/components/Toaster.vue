<template>
  <transition name="fade">
    <div
      v-if="visible && toast"
      :class="[
        'fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white font-semibold',
        toast.type === 'success' ? 'bg-green-500' :
        toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      ]"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  toast: Object,
  duration: { type: Number, default: 3000 },
  onClose: Function,
});

const visible = ref(false);
let timer = null;

watch(
  () => props.toast,
  (newToast) => {
    if (newToast) {
      visible.value = true;

      // Clear any existing timer
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        visible.value = false;
        props.onClose?.();
      }, props.duration);
    }
  },
  { immediate: true }
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
