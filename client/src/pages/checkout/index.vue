<template>
  <div class="main">
    <div class="cart">
      <Cart :products="cart.products"></Cart>
    </div>
    <div class="checkout">
      <div class="summary">
        <p>Ordersammanfattning</p>
        <div class="order-item" v-for="item in cart.products">
          <span class="name">{{ item.name }}</span>
          <span class="price">{{ item.price }}kr</span>
        </div>
        <p class="sum">Totalsumma</p>
      </div>
      <PaymentForm></PaymentForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useCartStore } from "../../stores/cartStore";
import Cart from "../../components/Cart.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import PaymentForm from "../../components/PaymentForm.vue";

const cartStore = useCartStore();

const cart = computed(() => cartStore.getCart);
</script>

<style lang="scss" scoped>
.main {
  //   padding: 0px;
  .cart {
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    @include flex(column, space-evenly, center, 2rem);
    .product {
    }
  }
}

:deep(.product) {
  padding: 20px 0px;
  border-bottom: 1px solid rgba(211, 211, 211, 0.774);
  //   box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}
</style>
