<template>
  <div class="main">
    <h2>Orderbekräftelse</h2>
    <div class="text">
      Vi har nu tagit emot din order
      {{
        orderId.toLocaleString().substring(orderId.toLocaleString().length - 10)
      }}
    </div>
    <div class="products">
      <Cart :products="confirmationOrder?.products"></Cart>
    </div>
    <div class="info">
      Du kommer inom kort få ett bekräftelsemejl med bekräftelse att vi mottagit
      din order. Därefter börjar vi hantera din beställning, vid frågor eller
      funderingar hänvisar vi dig till vår kontaktsida.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import useOrderQuery from "../../../composables/queries/useOrderQuery";
import Cart from "../../../components/Cart.vue";

const { params } = useRoute();

const orderId = params._id;

console.log(orderId.toLocaleString());

const { data: order } = useOrderQuery(orderId.toLocaleString());

const confirmationOrder = computed(() => order.value);

watch(confirmationOrder, (c, o) => {
  console.log(c?.products);
});
</script>

<style scoped lang="scss">
.main {
  padding: 50px;
  .info {
    font-family: $secondary-font;
    width: 70%;
    text-align: center;
    margin: 50px;
  }
}
</style>
