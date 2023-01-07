<template>
  <div class="start">
    <div class="products">
      <div class="product" v-for="prod in products" :key="prod._id">
        <div class="img">
          <img src="{{prod.img}}" alt="Bild av {{prod.name}}" />
        </div>
        <div class="info">
          <p class="name">{{ prod.name }}</p>
          <p class="price">{{ prod.price }}</p>
          <p class="stock">Lagerstatus: {{ prod.stock }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useProductsQuery from "~/composables/queries/useProductsQuery";

const { data: products } = useProductsQuery();
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
