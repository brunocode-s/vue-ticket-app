<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />
    <main class="flex-1 max-w-[1440px] mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

      <div class="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard :value="totalTickets" label="Total Tickets" color="text-blue-600" />
        <StatCard :value="openTickets" label="Open Tickets" color="text-green-600" />
        <StatCard :value="closedTickets" label="Closed Tickets" color="text-gray-600" />
      </div>

      <div class="mt-6 text-center">
        <router-link
          to="/tickets"
          class="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          Go to Tickets
        </router-link>
      </div>
    </main>
    <Footer />
    <Toaster :toast="toast" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Toaster from "../components/Toaster.vue";
import StatCard from "../components/StatCard.vue"; 
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const toast = ref(null);

// Retrieve tickets from localStorage or API
const tickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];

const totalTickets = computed(() => tickets.length);
const openTickets = computed(() => tickets.filter((t) => t.status === "open").length);
const closedTickets = computed(() => tickets.filter((t) => t.status === "closed").length);

// Logout function
const handleLogout = () => {
  auth.logout();
  toast.value = { message: "Logged out successfully", type: "success" };
  setTimeout(() => router.push("/login"), 500);
};
</script>
