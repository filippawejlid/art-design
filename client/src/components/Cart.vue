<template>
  <div
    v-if="products?.length"
    class="product"
    v-for="product in products"
    :key="product._id"
  >
    <div class="img">
      <img :src="product.img" alt="" />
    </div>
    <div class="container">
      <div class="info">
        <div class="name">{{ product.name }}</div>
        <div class="price">{{ product.price }}kr</div>
      </div>
      <div class="edit" v-if="showEdit">
        <Button
          class="p-button-outlined p-button-rounded"
          icon="pi pi-minus"
          @click="decrease(product)"
        ></Button>
        <p class="quantity">{{ product.quantity }}</p>
        <Button
          class="p-button-outlined p-button-rounded"
          icon="pi pi-plus"
          @click="increase(product)"
        ></Button>
      </div>
    </div>
  </div>

  <div v-else>Din varukorg är tom...</div>
</template>

<script setup lang="ts">
import { Product } from "../models/Product";
import Button from "primevue/button";
import { useCartStore } from "../stores/cartStore";

interface Props {
  products?: Product[];
  showEdit?: boolean;
}

defineProps<Props>();

const cartStore = useCartStore();

const decrease = (product: Product) => {
  cartStore.removeProduct(product);
};

const increase = (product: Product) => {
  cartStore.addProduct(product);
};
</script>

<style scoped lang="scss">
* {
  font-family: $secondary-font;
}
.product {
  position: relative;
  @include flex(row, space-evenly, flex-start, 2rem);

  .img {
    img {
      object-fit: cover;
      width: 150px;
      height: 200px;
    }
  }

  .container {
    height: 200px;
    @include flex(column, space-between, flex-end, 1rem);

    .info {
      @include flex(column, space-between, flex-start, 1rem);
      width: 100%;
      @include tablet() {
        align-items: flex-end;
      }

      .price {
        font-weight: bold;
      }
    }
    .edit {
      @include flex(row, flex-start, center, 1rem);
      .quantity {
        font-size: 1.2rem;
      }
    }
  }
}

:deep(.p-button-rounded) {
  border: 1px solid #8c8c8c;
  color: #717171;
  width: 0.5rem;
  height: 0.5rem !important;
  padding: 0.8rem;

  &:focus,
  &:hover {
    border: 1px solid #656565 !important;
    color: #656565 !important;
  }

  .pi {
    font-size: 0.7rem;
  }
}
</style>
