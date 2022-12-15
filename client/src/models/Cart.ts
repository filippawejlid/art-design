import { Product } from "./Product";

export class Cart {
  products: Product[];
  totalAmount: number;

  constructor() {
    this.products = [];
    this.totalAmount = getSum(this.products);
  }
}

const getSum = (products: Product[]) => {
  const prices = products.map((p) => p.price * p.quantity);

  return prices.reduce((partialSum, a) => partialSum + a, 0);
};
