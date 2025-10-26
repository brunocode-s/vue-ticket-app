import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import Login from "../pages/Auth/Login.vue";
import Signup from "../pages/Auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
// import TicketList from "../pages/Tickets/TicketList.vue";
import TicketsPage from "../pages/Tickets/TicketPage.vue";
// import TicketForm from "../pages/Tickets/TicketForm.vue";
import { useAuthStore } from "../store/authStore";

const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/tickets", component: TicketsPage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.user) next("/login");
  else next();
});

export default router;
