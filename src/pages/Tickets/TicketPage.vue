<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
  
      <main class="flex-1 w-full max-w-[1440px] mx-auto px-6 py-12 space-y-10">
        <!-- Ticket Form -->
        <TicketForm
          :tickets="tickets"
          :editingTicket="editingTicket"
          @updateTickets="tickets = $event"
          @setEditingTicket="editingTicket = $event"
          :toast="toast"
        />
  
        <!-- Ticket List -->
        <TicketList
          :tickets="tickets"
          @deleteTicket="handleDelete"
          @editTicket="editingTicket = $event"
        />
      </main>
  
      <Footer />
      <Toaster :toast="toast" />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Header from "../../components/Header.vue";
  import Footer from "../../components/Footer.vue";
  import TicketForm from "./TicketForm.vue";
  import TicketList from "./TicketList.vue";
  import Toaster from "../../components/Toaster.vue";
  import { deleteTicket } from "../../services/ticketService";
  
  const tickets = ref(JSON.parse(localStorage.getItem("ticketapp_tickets")) || []);
  const editingTicket = ref(null);
  const toast = ref(null);
  
  const handleDelete = (id) => {
    tickets.value = deleteTicket(id); // returns updated tickets
    toast.value = { message: "Ticket deleted", type: "success" };
  };
  </script>
  