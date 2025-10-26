<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <!-- Header -->
      <Header />
  
      <main class="flex flex-grow items-center justify-center px-6 py-12">
        <div class="w-full max-w-md">
          <!-- Card -->
          <div class="bg-white shadow-xl rounded-2xl p-8 backdrop-blur-sm border border-gray-100">
            <!-- Header -->
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p class="text-gray-600">Sign in to continue to your dashboard</p>
            </div>
  
            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  v-model="email"
                  placeholder="you@example.com"
                  class="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
  
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700">Password</label>
                  <router-link
                    to="/forgot-password"
                    class="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot?
                  </router-link>
                </div>
                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <div class="absolute inset-y-0 right-3 flex items-center cursor-pointer" @click="showPassword = !showPassword">
                    <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-gray-500 text-lg cursor-pointer"></i>

                  </div>
                </div>
              </div>
  
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>
  
            <!-- Link -->
            <div class="mt-6 text-center">
              <p class="text-gray-600 text-sm">
                Don't have an account?
                <router-link to="/signup" class="text-blue-600 font-semibold hover:text-blue-700">Sign up</router-link>
              </p>
            </div>
          </div>
  
          <!-- Toast -->
          <Toaster v-if="toast" :toast="toast" />
        </div>
      </main>
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick } from "vue";
  import { useRouter } from "vue-router";
  import Header from "../../components/Header.vue";
  import Footer from "../../components/Footer.vue";
  import Toaster from "../../components/Toaster.vue";
  import { loginUser } from "../../services/auth";
  import { useAuthStore } from "../../store/authStore";
  const auth = useAuthStore();

  
  const email = ref("");
  const password = ref("");
  const toast = ref(null);
  const showPassword = ref(false);
  const router = useRouter();
  
  const handleLogin = async () => {
  const result = loginUser(email.value, password.value);

  if (result.success) {
    auth.user = result.user;
    toast.value = { message: "Login successful!", type: "success" };

    await nextTick();

    setTimeout(() => router.push("/dashboard"), 1200);
  } else {
    toast.value = { message: result.message || "Invalid email or password", type: "error" };
  }
};
  </script>
  