# Ticket Easy App — Vue.js Version

A fully functional **Ticket Management App** implemented in **Vue 3 (Vite)** with **Tailwind CSS**.  
Implements the same layout, components, and features as the React and Twig versions.


## Tech Stack

- **Frontend:** Vue 3 + Vite
- **Styling:** Tailwind CSS
- **Icons:** `vue-icons/io5`
- **State Management:** LocalStorage
- **Routing:** Vue Router
- **Notifications:** Custom toast system (Alpine-style)

## Core Features

### Landing Page
- Wavy hero section using SVG.
- Decorative circles with absolute positioning.
- Responsive (max width 1440px).

### Authentication
- Login & Signup with inline validation.
- Uses `localStorage.ticketapp_session` as session token.
- Redirects to `/dashboard` on success.

### Dashboard
- Displays ticket statistics.
- Protected routes (router guard checks localStorage).
- Logout clears session and redirects to landing.

### Ticket Management
- Create, edit, delete tickets (localStorage CRUD).
- Validation for `title` and `status`.
- Inline + toast notifications.

## Setup & Run

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build
