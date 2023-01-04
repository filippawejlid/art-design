<template>
  <div class="orders">
    <div class="order" v-for="order in orders">
      <div class="customer">
        <h5>Kundinformation:</h5>
        <p>{{ order.customer.firstName }}</p>
        <p>{{ order.customer.lastName }}</p>
        <p>{{ order.customer.email }}</p>
      </div>
      <p>{{ order.totalAmount }}</p>
      <h5>Beställning:</h5>

      <div class="products" v-for="product in order.products">
        <p>{{ product.name }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useOrderQuery from "../../composables/queries/useOrderQuery";

const { data: orders } = useOrderQuery();
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
