<template>
    <div class="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
      <h2 :class="'text-3xl font-bold ' + color">{{ value }}</h2>
      <p class="text-gray-600 mt-1">{{ label }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    value: [Number, String],
    label: String,
    color: String,
  });
  </script>
  