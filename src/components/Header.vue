<template>
  <Menubar class="header" :model="items">
    <template #start>
      <i @click="openCart()" class="pi pi-shopping-cart"></i>
    </template>
    <template #end>
      <div class="logo">Art & Design</div>
    </template>
  </Menubar>

  <Dialog
    v-model:visible="display"
    :style="{ width: '40vw' }"
    :modal="true"
    :header="'Varukorg'"
  >
    <div class="modal">hej</div>
  </Dialog>
</template>

<script lang="ts" setup>
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import { ref } from "vue";
let display = ref(false);

const items = [
  {
    label: "Produkter",
    url: "/products",
  },
  {
    label: "Om mig",
    url: "/about",
  },
  {
    label: "Kontakt",
    url: "/contact",
  },
];

const openCart = () => {
  display.value = true;
};
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  padding: 10px 10px;
  @include flex(row, space-between, center);
  .logo {
    font-family: $cursive;
    font-size: 2rem;
  }
}
</style>
