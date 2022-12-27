<template>
  <router-view />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { QueryCache, useQueryProvider } from "vue-query";
import { RouterView } from "vue-router";
import { products } from "./services/ProductsService";
import useApi from "./services/useApi";

watchEffect(() => {
  products.forEach((prod) => {
    useApi().post("/add-base-products", prod);
    console.log("heheheheh");
  });
});

useQueryProvider({
  queryCache: new QueryCache({
    onError: (error) => console.log(error),
  }),
});
</script>

<style scoped></style>
