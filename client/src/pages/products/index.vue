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
        :key="product._id"
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
    <ProductModal :product="displayProduct"></ProductModal>
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
import ProductModal from "../../components/ProductModal.vue";
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
  cartStore.addProduct(addedProduct);
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
          height: 250px;
          object-fit: cover;

          @include tablet() {
          }
          @include desktop() {
          }
          @include desktop-xl() {
            height: 300px;
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
