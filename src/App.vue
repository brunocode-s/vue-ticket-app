<template>
  <div class="flex flex-col min-h-screen">
    <router-view />
    <Toaster :toast="toast" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Toaster from "./components/Toaster.vue";

const toast = ref(null);
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
