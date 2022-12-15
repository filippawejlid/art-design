import { useProductsStore } from "../stores/productsStore";
import useProductsQuery from "./queries/useProductsQuery";
import cloneDeep from "lodash.clonedeep";
import { watchEffect } from "vue";

const useProducts = () => {
  const productsStore = useProductsStore();
  const { data: products } = useProductsQuery();

  watchEffect(() => {
    productsStore.setProducts(cloneDeep(products.value));
  });
};

export default useProducts;
