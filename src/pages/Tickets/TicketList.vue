<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="ticket in tickets"
      :key="ticket.id"
      class="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all hover:scale-105 duration-300"
    >
      <div>
        <h3 class="font-bold text-xl text-gray-800 mb-3">{{ ticket.title }}</h3>
        <span
          class="inline-block px-4 py-1.5 rounded-full text-white text-sm font-medium"
          :class="{
            'bg-gradient-to-r from-green-500 to-emerald-600': ticket.status === 'open',
            'bg-gradient-to-r from-amber-500 to-orange-600': ticket.status === 'in_progress',
            'bg-gradient-to-r from-gray-500 to-gray-600': ticket.status === 'closed'
          }"
        >
          {{ ticket.status.replace('_', ' ').toUpperCase() }}
        </span>
      </div>

      <div class="flex justify-between mt-4">
        <button
          @click="$emit('editTicket', ticket)"
          class="text-blue-500 font-semibold hover:text-blue-700"
        >
          Edit
        </button>
        <button
          @click="$emit('deleteTicket', ticket.id)"
          class="text-red-500 font-semibold hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-if="tickets.length === 0" class="col-span-full text-center py-20">
      <p class="text-gray-500 text-lg">No tickets found</p>
      <p class="text-gray-400 text-sm mt-2">
        Create your first ticket to get started
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tickets: Array
});
const emit = defineEmits(["deleteTicket", "editTicket"]);
</script>
