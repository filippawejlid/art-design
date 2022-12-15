import { defineStore } from "pinia";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

interface CartState {
  cart: Cart;
}

export const useCartStore = defineStore("Cart", {
  state: (): CartState => {
    return {
      cart: {
        products: [],
        totalAmount: 0,
      },
    };
  },
  getters: {
    getCart(): Cart {
      return this.cart as Cart;
    },
  },
  actions: {
    setNewProduct(product: Product) {
      const found = this.cart.products.find((p) => p.id === product.id);
      if (found) {
        found.quantity++;
        const index = this.cart.products.findIndex((p) => p.id === found.id);
        this.cart.products.splice(1, index, found);
      } else {
        product.quantity++;
        this.cart.products.push(product);
      }
    },
    removeProduct(product: Product) {
      const index = this.cart.products.findIndex((p) => p.id === product.id);
      if (!index) return;
      console.log(
        "innan",
        this.cart.products.find((p) => p.id === product.id)?.quantity
      );

      this.cart.products.splice(1, index, {
        ...product,
        quantity: product.quantity - 1,
      });
      console.log(
        "efter",
        this.cart.products.find((p) => p.id === product.id)?.quantity
      );
    },
  },
});
