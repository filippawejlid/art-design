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
    },
    removeProduct(product: Product) {
      const index = this.cart.products.findIndex((p) => p._id === product._id);
      console.log("men hallå");

      if (this.cart.products[index].quantity === 1) {
        console.log("1");

        this.cart.products.splice(index, 1);
      } else {
        console.log("mer");

        this.cart.products[index].quantity--;
      }

      this.cart.totalAmount = updateAmount(this.cart.products);
    },
  },
});

const updateAmount = (products: Product[]) => {
  const prices = products.map((p) => p.price * p.quantity);

  return prices.reduce((partialSum, a) => partialSum + a, 0);
};
