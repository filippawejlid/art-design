<template>
  <div class="main">
    <div class="cart">
      <h2>Varukorg</h2>
      <Cart :showEdit="show" :products="cart.products"></Cart>
      <div class="checkout">
        <div class="summary">
          <p>Ordersammanfattning</p>
          <div class="order-item" v-for="item in cart.products">
            <span class="name"> {{ item.quantity }}x {{ item.name }}</span>
            <span class="price">{{ item.price * item.quantity }}kr</span>
          </div>
          <p class="sum">Totalsumma: {{ cart.totalAmount }}kr</p>
        </div>
      </div>
    </div>
    <PaymentForm @getCustomerInfo="sendOrder"></PaymentForm>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Product } from "~/models/Product";
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
  let orderProducts: Product[] = [];

  cart.value.products.forEach((product) => {
    for (let index = 0; index < product.quantity; index++) {
      orderProducts.push(product);
    }
  });

  const order = {
    _id: "",
    customer: customer,
    products: orderProducts,
    totalAmount: cart.value.totalAmount,
  };

  postOrder.mutateAsync(order).then((data) => {
    cartStore.emptyCart();
    router.push(`/checkout/${data.data._id}/confirmation`);
  });
};
</script>

<style lang="scss" scoped>
.main {
  @include desktop() {
    flex-direction: row;
    align-items: flex-start;
  }

  .cart {
    border-radius: 5px;
    padding: 20px;
    @include flex(column, space-evenly, center, 2rem);
    @include desktop() {
      width: 50%;
    }

    p {
      font-weight: normal;
    }
  }

  .checkout {
    padding: 20px;
    .summary {
      @include flex(column, flex-start, normal, 1rem);
      * {
        font-family: $secondary-font;
      }

      p {
        font-weight: normal;
        text-align: center;
      }
      .order-item {
        @include flex(row, space-between, center, 1rem);

        .price {
        }
      }

      .sum {
        font-weight: bold;
        text-align: center;
      }
    }
  }
}

:deep(.product) {
  padding: 20px 0px;
  border-bottom: 1px solid rgba(211, 211, 211, 0.774);
}
</style>
