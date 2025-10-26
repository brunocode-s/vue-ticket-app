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
              Create Account
            </h2>
            <p class="text-gray-600">Join us and start managing tickets</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSignup" class="space-y-5">
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
              <label class="block text-sm font-medium text-gray-900 mb-2">Password</label>
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
              <div v-if="password" class="mt-2 h-2 w-full bg-gray-300 rounded">
                <div
                  class="h-2 rounded"
                  :class="getPasswordStrengthLabel().color"
                  :style="{ width: `${(passwordStrength(password)/5)*100}%` }"
                ></div>
                <p class="text-sm mt-1 text-gray-700">Strength: {{ getPasswordStrengthLabel().label }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <div class="absolute inset-y-0 right-3 flex items-center cursor-pointer" @click="showConfirmPassword = !showConfirmPassword">
                  <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-gray-500 text-lg cursor-pointer"></i>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600 text-sm">
              Already have an account?
              <router-link to="/login" class="text-blue-600 font-semibold hover:text-blue-700">Log in</router-link>
            </p>
          </div>
        </div>

        <p class="text-center text-gray-500 text-sm mt-6">
          By signing up, you agree to our Terms and Privacy Policy
        </p>

        <Toaster v-if="toast" :toast="toast" />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import Toaster from "../../components/Toaster.vue";
import { registerUser } from "../../services/auth";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const toast = ref(null);

const router = useRouter();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pw) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);

const passwordStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[!@#$%^&*]/.test(pw)) score++;
  return score;
};

const getPasswordStrengthLabel = () => {
  const score = passwordStrength(password.value);
  if (score <= 2) return { label: "Weak", color: "bg-red-500" };
  if (score === 3) return { label: "Medium", color: "bg-yellow-400" };
  if (score >= 4) return { label: "Strong", color: "bg-green-500" };
};

const handleSignup = async () => {
  if (!validateEmail(email.value)) {
    toast.value = { message: "Please enter a valid email address", type: "error" };
    return;
  }
  if (!validatePassword(password.value)) {
    toast.value = {
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      type: "error",
    };
    return;
  }
  if (password.value !== confirmPassword.value) {
    toast.value = { message: "Passwords do not match!", type: "error" };
    return;
  }

  const result = registerUser(email.value, password.value);

  if (result.success) {
    toast.value = { message: "Signup successful!", type: "success" };

    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    await nextTick();
    setTimeout(() => router.push("/login"), 1000);
  } else {
    toast.value = { message: result.message || "Signup failed", type: "error" };
  }
};
</script>
