<template>
  <div class="main">
    <div class="cart">
      <Cart :showEdit="show" :products="cart.products"></Cart>
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
      <PaymentForm @getCustomerInfo="sendOrder"></PaymentForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import Cart from "../../components/Cart.vue";
import PaymentForm from "../../components/PaymentForm.vue";
import useOrderQuery from "../../composables/queries/useOrderQuery";
import { Customer } from "../../models/Customer";
import { useCartStore } from "../../stores/cartStore";

const { postOrder } = useOrderQuery();
const cartStore = useCartStore();

const cart = computed(() => cartStore.getCart);

const router = useRouter();

const show = true;

const sendOrder = (customer: Customer) => {
  const order = {
    _id: "",
    customer: customer,
    products: cart.value.products,
    totalAmount: cart.value.totalAmount,
  };

  postOrder.mutateAsync(order).then((data) => {
    //TÖM CART
    console.log("data", data);
    router.push(`/checkout/${data.data._id}/confirmation`);
  });
};
</script>

<style lang="scss" scoped>
.main {
  //   padding: 0px;
  .cart {
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    @include flex(column, space-evenly, center, 2rem);
  }
}

:deep(.product) {
  padding: 20px 0px;
  border-bottom: 1px solid rgba(211, 211, 211, 0.774);
  //   box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}
</style>
