import { defineStore } from "pinia";
import { loginUser, logoutUser, getCurrentUser } from "../services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getCurrentUser(), 
  }),
  actions: {
    login(email, password) {
      const res = loginUser(email, password);
      if (res.success) this.user = res.user;
      return res;
    },
    logout() {
      logoutUser();
      this.user = null;
    },
  },
});
