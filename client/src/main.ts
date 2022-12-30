import { useUserStore } from "./stores/userStore";
import { createApp } from "vue";
import "../src/assets/style/style.scss";
import App from "./App.vue";
import NotFound from "../src/pages/NotFound.vue";

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import Dialog from "primevue/dialog";
import ToastService from "primevue/toastservice";

import { createRouter, createWebHistory } from "vue-router";

import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { pinia } from "./modules/pinia";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, { path: "/:pathMatch(.*)*", component: NotFound }],
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (!userStore.isAdmin && to.name === "admin") {
    return "/";
  }
});

const app = createApp(App);
app.use(PrimeVue).use(ToastService).use(pinia).use(router);
app.directive("tooltip", Tooltip);

app.component("Dialog", Dialog);
app.mount("#app");
