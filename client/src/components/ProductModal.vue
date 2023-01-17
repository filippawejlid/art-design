<template>
  <div class="modal">
    <div class="content">
      <div class="img-container">
        <img
          :src="`../../../images/${product.img}`"
          :alt="`Bild av ${product.name}`"
        />
      </div>
      <div class="info-container">
        <div class="info">
          <p class="name">{{ product.name }}</p>
          <p class="price">{{ product.price }}kr</p>
        </div>
        <div class="desc">{{ product.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from "../models/Product";

interface Props {
  product: Product;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;

  @include desktop() {
    align-items: flex-start;
    justify-content: flex-start;
  }
  .content {
    @include flex(column, space-evenly, center, 1rem);
    width: 300px;

    @include desktop() {
      @include flex(row, space-evenly, flex-start, 3rem);
      width: 100%;
    }
    .img-container {
      width: 100%;

      @include desktop() {
        width: 50%;
      }
      img {
        width: 100%;
      }
    }

    .info-container {
      @include flex(column, flex-start, flex-start, 2rem);

      width: 100%;

      @include desktop() {
        width: 50%;
      }
      .info {
        width: 100%;
        @include flex(row, space-between, flex-start);

        @include desktop() {
          flex-direction: column;
          gap: 1rem;
        }
        .name,
        .price {
          font-size: larger;
          font-weight: bold;
          font-family: $secondary-font;
        }
      }
      .desc {
        font-family: $secondary-font;
      }
    }
  }
}
</style>
