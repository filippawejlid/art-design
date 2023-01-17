<template>
  <div class="order-page">
    <h2>Alla ordrar</h2>
    <div class="orders">
      <div class="order" v-for="order in orders">
        <div class="customer">
          <h5>Kundinformation:</h5>
          <div>
            <span class="text">Förnamn: </span>
            <span>{{ order.customer.firstName }}</span>
          </div>
          <div>
            <span class="text">Efternam: </span>
            <span>{{ order.customer.lastName }}</span>
          </div>
          <div>
            <span class="text">Email: </span>
            <span>{{ order.customer.email }}</span>
          </div>
        </div>

        <h5>Beställning:</h5>
        <div class="products" v-for="product in order.products">
          <p>{{ product.quantity }}x {{ product.name }}</p>
        </div>
        <p>Totalsumma: {{ order.totalAmount }}kr</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useOrderQuery from "../../composables/queries/useOrderQuery";

const { data: orders } = useOrderQuery();
</script>

<style lang="scss" scoped>
.order-page {
  background-color: white;
  padding: 20px;
  h2 {
    text-align: center;
    margin: 15px;
  }

  .orders {
    padding: 20px;
    @include flex(column, center, center, 3rem);

    @include tablet() {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .order {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      padding: 30px;

      h5 {
        margin: 15px 0px;
        font-family: $base-font;
      }
      * {
        font-family: $secondary-font;
      }
      .customer {
        margin-bottom: 60px;
        .text {
          width: 60px;
        }
        div {
          @include flex(row, flex-start, flex-start, 2rem);
        }
      }

      .products {
      }
    }
  }
}
</style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
