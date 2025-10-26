export function initDefaultUser() {
    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    if (!users.find((u) => u.email === "testuser@example.com")) {
      users.push({ email: "testuser@example.com", password: "password123" });
      localStorage.setItem("ticketapp_users", JSON.stringify(users));
    }
  }
  
  export function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }
    const newUser = { email, password };
    localStorage.setItem("ticketapp_users", JSON.stringify([...users, newUser]));
    localStorage.setItem("ticketapp_session", JSON.stringify(newUser));
    return { success: true, user: newUser };
  }
  
  export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("ticketapp_session", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: "Invalid credentials." };
  }
  
  export function logoutUser() {
    localStorage.removeItem("ticketapp_session");
  }
  
  export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("ticketapp_session"));
  }
  