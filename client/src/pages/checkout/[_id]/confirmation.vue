<template>
  <div>
    <h2>Orderbekräftelse</h2>
    <div class="text">
      Vi har nu tagit emot din order
      {{
        orderId.toLocaleString().substring(orderId.toLocaleString().length - 5)
      }}
    </div>
    <div class="products">
      <Cart :products="confirmationOrder?.products"></Cart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import useOrderQuery from "../../../composables/queries/useOrderQuery";
import Cart from "../../../components/Cart.vue";

const { params } = useRoute();

const orderId = params._id;

console.log(orderId.toLocaleString());

const { data: order } = useOrderQuery(orderId.toLocaleString());

const confirmationOrder = computed(() => order.value);

console.log(confirmationOrder.value, "hihiihihhihi");
</script>

<style scoped></style>
