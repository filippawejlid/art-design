<template>
  <div class="start small">
    <Menubar :model="itemsMobile"></Menubar>
  </div>
  <div class="start large">
    <TabMenu :model="items" />
  </div>

  <div class="main-admin">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TabMenu from "primevue/tabmenu";
import Menubar from "primevue/menubar";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const items = [
  { label: "Startsida", to: "/admin/start" },
  { label: "Redigera produkter", to: "/admin/edit" },
  { label: "Lägg till ny produkt", to: "/admin/add" },
  { label: "Se alla ordrar", to: "/admin/orders" },
  {
    label: "Logga ut",
    to: "/",
    command: () => {
      userStore.setIsAdmin(false);
    },
  },
];

const itemsMobile = [
  { label: "Startsida", url: "/admin/start" },
  { label: "Redigera produkter", url: "/admin/edit" },
  { label: "Lägg till ny produkt", url: "/admin/add" },
  { label: "Se alla ordrar", url: "/admin/orders" },
  { label: "Logga ut", url: "/admin/logout" },
];
</script>

<style lang="scss" scoped>
.small {
  @include desktop() {
    display: none;
  }
}

.large {
  visibility: hidden;

  @include desktop() {
    visibility: visible;
  }
}
</style>
