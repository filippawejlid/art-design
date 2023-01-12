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

  <Dialog
    class="cart-dialog"
    v-model:visible="display"
    :modal="true"
    :header="'Varukorg'"
  >
    <div class="cart-products">
      <Cart :showEdit="show" :products="cart.products"></Cart>
    </div>
    <template #footer>
      <div class="footer" v-if="cart.totalAmount > 0">
        <div class="total">Totalsumma: {{ cart.totalAmount }}kr</div>
        <router-link v-slot="{ navigate }" custom :to="'/checkout'">
          <Button
            @click="
              () => {
                navigate();
                display = false;
              }
            "
            label="Gå till kassan"
            class="button go-to-checkout"
          />
        </router-link>
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

const show = true;

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

  .pi {
    padding: 0.75rem 1.25rem;
    border-radius: 6px;

    &:hover {
      background: #e9ecef;
    }
  }
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

.cart-dialog,
.p-dialog {
  @include tablet() {
    width: 30vw !important;
  }
}
</style>
