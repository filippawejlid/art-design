import { defineStore } from "pinia";
import { Product } from "../models/Product";

interface ProductsState {
  products?: Product[];
}

export const useProductsStore = defineStore("Product", {
  state: (): ProductsState => {
    return {
      products: [],
    };
  },
  getters: {
    getProducts(): Product[] {
      return this.products as Product[];
    },
  },
  actions: {
    setProducts(products?: Product[]) {
      this.products = products;
    },
  },
});
