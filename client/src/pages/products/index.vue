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
      <div
        class="product"
        v-for="product in products"
        :key="product.id"
        @click="openProduct(product)"
      >
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

  <Dialog v-model:visible="display" :modal="true">
    <div class="modal">
      <div class="content">
        <div class="img-container">
          <img
            :src="displayProduct.img"
            alt="Bild på '{{displayProduct.name}}'"
          />
        </div>
        <div class="info-container">
          <div class="info">
            <p class="name">{{ displayProduct.name }}</p>
            <p class="price">{{ displayProduct.price }}kr</p>
          </div>
          <div class="desc">{{ displayProduct.description }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <div>
        <Button
          label="Lägg till i varukorgen"
          icon="pi pi-plus"
          iconPos="right"
          class="button"
          @click="addToCart(displayProduct)"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { computed, ref, watch } from "vue";
import useProducts from "../../composables/useProducts";
import { Product } from "../../models/Product";
import { useCartStore } from "../../stores/cartStore";
import { useProductsStore } from "../../stores/productsStore";

useProducts();

const productsStore = useProductsStore();
const cartStore = useCartStore();
const products = computed(() => productsStore.getProducts);

watch(cartStore.cart, (c, o) => {
  console.log(c);
});

let display = ref(false);

const displayProduct = ref(new Product());

const openProduct = (product: Product) => {
  displayProduct.value = product;
  display.value = true;
};

const addToCart = (addedProduct: Product) => {
  console.log(cartStore.getCart);
  cartStore.setNewProduct(addedProduct);
};
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
    @include flex(row, space-between, flex-start, 1rem);
    flex-wrap: wrap;

    .product {
      cursor: pointer;
      width: 47%;
      @include tablet() {
      }

      @include desktop() {
        width: 30%;
      }

      @include desktop-xl() {
        width: 20%;
      }
      .img-container {
        width: 100%;
        img {
          width: 100%;

          @include tablet() {
          }
          @include desktop() {
          }
          @include desktop-xl() {
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
:deep(.p-button) {
  background: $base-brown;
  border: 1px solid $darker-brown;

  &:focus,
  &:hover {
    background: $darker-brown;
    border: 1px solid white;
  }
}
</style>
