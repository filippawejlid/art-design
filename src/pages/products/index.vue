<template>
  <div class="main">
    <div class="text">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id accusantium
      ipsa corrupti numquam sint recusandae ullam tempore eaque, repudiandae
      placeat quisquam quod mollitia, similique quam, delectus inventore vitae
      quas provident eveniet eligendi minus explicabo. Id, minima sequi vero hic
      neque quasi impedit iusto repellat fuga possimus nostrum at necessitatibus
      sit.
    </div>
    <h1>Tavlor</h1>
    <div class="products">
      <div class="product" v-for="product in products" :key="product.id">
        <div class="img-container">
          <img :src="product.img" alt="Bild av tavla" />
        </div>
        <div></div>
        <div class="info">
          <p class="name">{{ product.name }}</p>
          <p class="price">{{ product.price }}kr</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from "../../../api/products";
</script>

<style scoped lang="scss">
.main {
  padding: 20px;
  background-color: white;
  box-shadow: 5px 0 5px -5px rgba(179, 179, 179, 0.7),
    -5px 0 5px -5px rgba(181, 181, 181, 0.7);
  @include flex(column, flex-start, center, 2rem);

  @include tablet() {
    margin: 0px 30px;
  }
  @include desktop() {
    margin: 0px 100px;
  }

  @include desktop-xl() {
    margin: 0px 200px;
  }
  .text {
    font-family: $secondary-font;
    text-align: center;
    padding: 50px;
  }
  h1 {
    color: rgb(105, 105, 105);
    font-weight: 100;
  }

  .products {
    @include flex(row, space-between, flex-start, 2rem);
    flex-wrap: wrap;

    .product {
      cursor: pointer;
      margin: 5px;
      width: 40%;

      // @include tablet() {
      //   width: 25%;
      // }

      @include desktop() {
        width: 25%;
      }

      @include desktop-xl() {
        width: 20%;
        // padding: 20px;
      }
      .img-container {
        width: 100%;
        img {
          border-radius: 10px;
          width: 100%;
          height: 200px;
          object-fit: cover;

          @include tablet() {
            height: 280px;
          }
          @include desktop() {
            height: 320px;
          }
          @include desktop-xl() {
            max-height: 370px;
          }
        }
      }

      .info {
        @include flex(row, space-between, flex-start, 1rem);

        p {
          font-family: $secondary-font;
        }
        .price {
          font-weight: 600;
        }
        .name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
