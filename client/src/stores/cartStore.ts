import { defineStore } from "pinia";
import { Cart } from "../models/Cart";

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
    setCart(cart: Cart) {
      this.cart = cart;
    },
  },
});
