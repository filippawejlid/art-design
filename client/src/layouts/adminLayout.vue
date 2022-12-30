<template>
  <div class="start">
    <TabMenu :model="items" />
  </div>
  <div class="main-admin">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TabMenu from "primevue/tabmenu";

const items = [
  { label: "Startsida", to: "/admin/start" },
  { label: "Redigera produkter", to: "/admin/edit" },
  { label: "Lägg till ny produkt", to: "/admin/add" },
  { label: "Se alla ordrar", to: "/admin/orders" },
  { label: "Logga ut", to: "/admin/logout" },
];
</script>

<style scoped></style>
