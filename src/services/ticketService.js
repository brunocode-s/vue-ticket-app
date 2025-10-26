// Helper to generate unique IDs
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
  
  // Get all tickets from localStorage
  export function getTickets() {
    return JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
  }
  
  // Create a new ticket
  export function createTicket(title, status) {
    const tickets = getTickets();
    const newTicket = {
      id: generateId(),
      title,
      status, // must be: "open", "in_progress", "closed"
    };
    const updatedTickets = [...tickets, newTicket];
    localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
    return newTicket;
  }
  
  // Update existing ticket
  export function updateTicket(id, title, status) {
    const tickets = getTickets();
    const updatedTickets = tickets.map((t) =>
      t.id === id ? { ...t, title, status } : t
    );
    localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
    return updatedTickets;
  }
  
  // Delete a ticket
  export function deleteTicket(id) {
    const tickets = getTickets();
    const updatedTickets = tickets.filter((t) => t.id !== id);
    localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
    return updatedTickets;
  }
  