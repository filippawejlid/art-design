<template>
  <div class="start">
    <h2>Produkter</h2>
    <div class="products">
      <div class="product" v-for="prod in products" :key="prod._id">
        <div class="img">
          <img :src="prod.img" :alt="`Bild av ${prod.name}`" />
        </div>
        <div class="info">
          <div class="name">
            Namn: <span>{{ prod.name }} </span>
          </div>
          <div class="price">
            Pris: <span>{{ prod.price }}</span>
          </div>
          <div class="stock">
            Lagerstatus: <span>{{ prod.stock }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useProductsQuery from "~/composables/queries/useProductsQuery";

const { data: products } = useProductsQuery();
</script>

<style lang="scss" scoped>
.start {
  @include flex(column, center, center, 2rem);
  padding: 50px;
  margin-top: 10px;

  h2 {
    font-weight: 100;
    margin-bottom: 10px;
  }
  .products {
    @include flex(column, center, center, 4rem);

    @include tablet() {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .product {
      background-color: white;
      padding: 30px;
      .img {
        width: 250px;

        img {
          width: 100%;
        }
      }

      .info {
        * {
          font-family: $secondary-font;
        }
        div {
          @include flex(row, space-between, center, 2rem);
        }
      }
    }
  }
}
</style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
