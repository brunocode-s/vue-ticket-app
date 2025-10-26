import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import 'primeicons/primeicons.css';
import "./style.css";

import { initDefaultUser } from "./services/auth";

initDefaultUser();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Vue3Toastify);
app.mount("#app");
