<template>
  <div class="products">
    <div class="product" v-for="product in products" :key="product._id">
      <InputText v-model="product.name"></InputText>
      <InputNumber v-model="product.price"></InputNumber>
      <InputNumber v-model="product.stock"></InputNumber>
      <Textarea v-model="product.description" rows="6" cols="40" />
      <Button label="Spara ändringar" @click="edit(product._id)"></Button>
      <Button
        label="Radera"
        icon="pi pi-trash"
        @click="delProduct(product._id)"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductsStore } from "~/stores/productsStore";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import useProducts from "~/composables/useProducts";
import Textarea from "primevue/textarea";
import useApi from "~/services/useApi";
import useProductsQuery from "~/composables/queries/useProductsQuery";

const { addProduct, editProduct, deleteProduct } = useProductsQuery();

useProducts();

const productsStore = useProductsStore();

const products = computed(() => productsStore.getProducts);

const edit = (id: string) => {
  const product = products.value.find((p) => p._id === id);
  if (!product) return;
  editProduct.mutateAsync(product).then(() => {});
};
const delProduct = (id: string) => {
  deleteProduct.mutateAsync(id).then(() => {});
};
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
