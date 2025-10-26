<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 mb-8">
    <h2 class="text-xl font-bold text-gray-800 mb-4">
      {{ props.editingTicket ? "Edit Ticket" : "Create New Ticket" }}
    </h2>

    <div class="flex flex-col md:flex-row gap-4">
      <!-- Title input -->
      <input
        type="text"
        v-model="title"
        placeholder="Enter ticket title..."
        class="flex-1 px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      <select
        v-model="status"
        class="px-3 py-3 border border-gray-300 text-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <!-- Submit button -->
      <button
        @click="handleSubmit"
        :class="props.editingTicket ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'"
        class="text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:scale-105 duration-200"
      >
        {{ props.editingTicket ? "Update" : "Add Ticket" }}
      </button>

      <!-- Cancel button -->
      <button
        v-if="props.editingTicket"
        @click="cancelEdit"
        class="bg-gray-300 px-4 py-3 rounded-lg font-semibold hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { createTicket, updateTicket } from "../../services/ticketService";

// Props
const props = defineProps({
  tickets: Array,
  editingTicket: Object,
  toast: Object
});

// Emits
const emit = defineEmits(["updateTickets", "setEditingTicket"]);

// Local state
const title = ref("");
const status = ref("open");

// Watch for editingTicket changes
watch(
  () => props.editingTicket,
  (val) => {
    if (val) {
      title.value = val.title;
      status.value = val.status;
    } else {
      title.value = "";
      status.value = "open";
    }
  },
  { immediate: true }
);

// Submit handler
const handleSubmit = () => {
  if (!title.value.trim()) {
    if (props.toast) props.toast.value = { message: "Title is required", type: "error" };
    return;
  }

  let updatedTickets;
  if (props.editingTicket) {
    // Update existing ticket
    updatedTickets = updateTicket(props.editingTicket.id, title.value, status.value);
    emit("setEditingTicket", null);
    if (props.toast) props.toast.value = { message: "Ticket updated successfully", type: "success" };
  } else {
    // Create new ticket
    const newTicket = createTicket(title.value, status.value);
    updatedTickets = [...props.tickets, newTicket];
    if (props.toast) props.toast.value = { message: "Ticket created successfully", type: "success" };
  }

  emit("updateTickets", updatedTickets);

  // Reset local form
  title.value = "";
  status.value = "open";
};

// Cancel editing
const cancelEdit = () => {
  emit("setEditingTicket", null);
};
</script>
