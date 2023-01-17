<template>
  <div class="edit">
    <div class="products">
      <div class="product" v-for="product in products" :key="product._id">
        <div class="field">
          <InputText v-model="product.name"></InputText>
        </div>

        <div class="field">
          <InputNumber v-model="product.price"></InputNumber>
        </div>

        <div class="field">
          <InputNumber v-model="product.stock"></InputNumber>
        </div>
        <div class="field">
          <Textarea v-model="product.description" rows="6" cols="35" />
        </div>
        <div class="buttons">
          <Button label="Spara" @click="edit(product._id)"></Button>
          <Button
            label="Radera"
            icon="pi pi-trash"
            @click="delProduct(product._id)"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { computed } from "vue";
import useProductsQuery from "~/composables/queries/useProductsQuery";
import useProducts from "~/composables/useProducts";
import { useProductsStore } from "~/stores/productsStore";

const { editProduct, deleteProduct } = useProductsQuery();

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

<style lang="scss" scoped>
.edit {
  padding: 30px;
  margin: 10px;
  .products {
    @include flex(column, center, center, 3rem);

    @include tablet() {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .product {
      background-color: white;
      padding: 30px;
      .field {
        margin-bottom: 1.5rem;
        @include flex(row, center, center);

        * {
          width: 250px;
        }
      }
      .buttons {
        @include flex(row, space-between, center);
      }
    }
  }
}
</style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
