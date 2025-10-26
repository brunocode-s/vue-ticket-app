<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg"></div>
        <h1 class="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Ticket Easy
        </h1>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <template v-if="auth.user">
          <router-link
            to="/dashboard"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Dashboard
          </router-link>
          <router-link
            to="/tickets"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Tickets
          </router-link>
          <button
            @click="logout"
            class="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </router-link>
        </template>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-gray-700 hover:text-blue-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-gray-100 shadow-lg">
      <nav class="flex flex-col px-6 py-4 gap-4">
        <router-link to="/" class="text-gray-700 hover:text-blue-600 font-medium py-2">
          Home
        </router-link>
        <template v-if="auth.user">
          <router-link to="/dashboard" class="text-gray-700 hover:text-blue-600 font-medium py-2">
            Dashboard
          </router-link>
          <router-link to="/tickets" class="text-gray-700 hover:text-blue-600 font-medium py-2">
            Tickets
          </router-link>
          <button
            @click="logout"
            class="text-red-500 hover:text-red-600 font-medium text-left py-2"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-gray-700 hover:text-blue-600 font-medium py-2">
            Login
          </router-link>
          <router-link
            to="/signup"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 text-center"
          >
            Get Started
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const auth = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

function logout() {
  auth.logout();
  router.push("/login");
}
</script>
