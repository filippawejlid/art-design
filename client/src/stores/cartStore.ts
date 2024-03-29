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
      if (this.cart.products.length > 0) {
        return this.cart as Cart;
      } else {
        return JSON.parse(localStorage.getItem("cart") || "[]");
      }
    },
  },
  actions: {
    addProduct(product: Product) {
      const found = this.cart.products.find((p) => p._id === product._id);

      if (found) {
        found.quantity++;

        const index = this.cart.products.findIndex((p) => p._id === found._id);
        this.cart.products.splice(index, 1, found);
      } else {
        this.cart.products.push(product);
      }
      this.cart.totalAmount = updateAmount(this.cart.products);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeProduct(product: Product) {
      const index = this.cart.products.findIndex((p) => p._id === product._id);

      if (this.cart.products[index].quantity === 1) {
        this.cart.products.splice(index, 1);
      } else {
        this.cart.products[index].quantity--;
      }

      this.cart.totalAmount = updateAmount(this.cart.products);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    emptyCart() {
      this.cart.products = [];
      this.cart.totalAmount = 0;
      localStorage.removeItem("cart");
    },
  },
});

const updateAmount = (products: Product[]) => {
  const prices = products.map((p) => p.price * p.quantity);

  return prices.reduce((partialSum, a) => partialSum + a, 0);
};
