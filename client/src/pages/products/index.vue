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
          <img
            :src="`../../../../images/${product.img}`"
            :alt="`Bild av ${product.name}`"
          />
        </div>
        <div class="info">
          <p class="name">{{ product.name }}</p>
          <p class="price">{{ product.price }}kr</p>
        </div>
      </div>
    </div>
  </div>
  <Toast />
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
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { computed, ref, watch } from "vue";
import ProductModal from "../../components/ProductModal.vue";
import useProducts from "../../composables/useProducts";
import { Product } from "../../models/Product";
import { useCartStore } from "../../stores/cartStore";
import { useProductsStore } from "../../stores/productsStore";

const toast = useToast();
useProducts();

const productsStore = useProductsStore();
const cartStore = useCartStore();
const products = computed(() => productsStore.getProducts);

let display = ref(false);

const displayProduct = ref(new Product());

const getImgUrl = (imgName: string) => {
  return "../../../../images/" + imgName;
};

const openProduct = (product: Product) => {
  displayProduct.value = product;
  display.value = true;
};

const addToCart = (addedProduct: Product) => {
  cartStore.addProduct(addedProduct);
  showAddSuccess();
};

const showAddSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Produkten tillagd i varukorgen",
    life: 3000,
  });
};
</script>

<style scoped lang="scss">
.main {
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
    @include flex(row, space-between, flex-start, 0rem);
    flex-wrap: wrap;

    .product {
      margin-bottom: 50px;
      cursor: pointer;
      width: 47%;
      @include tablet() {
      }

      @include desktop() {
        width: 30%;
      }

      @include desktop-xl() {
        width: 23%;
      }
      .img-container {
        width: 100%;
        img {
          width: 100%;
          height: 250px;
          object-fit: cover;

          @include desktop-xxl() {
            height: 380px;
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
