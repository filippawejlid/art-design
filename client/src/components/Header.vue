<template>
  <Menubar class="header" :model="items">
    <template #start>
      <i @click="openCart()" class="pi pi-shopping-cart"></i>
    </template>
    <template #end>
      <div class="logo">
        <p>Art & Design</p>
        <span>Diana Bellange</span>
      </div>
    </template>
  </Menubar>

  <Dialog v-model:visible="display" :modal="true" :header="'Varukorg'">
    <div class="cart-products">
      <Cart :products="cart.products"></Cart>
    </div>
    <template #footer>
      <div class="footer" v-if="cart.totalAmount > 0">
        <div class="total">Totalsumma: {{ cart.totalAmount }}kr</div>
        <Button label="Gå till kassan" class="button" />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Cart from "./Cart.vue";
import { computed, ref } from "vue";
import { useCartStore } from "../stores/cartStore";
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

const cartStore = useCartStore();

const cart = computed(() => cartStore.getCart);
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  padding: 10px 10px;
  @include flex(row, space-between, center);
  .logo {
    position: relative;
    @include flex(column, center, center);
    p {
      font-family: $cursive;
      font-size: 2rem;
    }
    span {
      position: absolute;
      font-size: 0.7rem;
      bottom: -3px;
      left: 22px;
    }
  }
}

.cart-products {
  @include flex(column, space-between, center, 3rem);
}
.footer {
  .total {
    font-family: $secondary-font;
    margin-bottom: 20px;
  }
}
</style>
