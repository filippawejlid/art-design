import { Product } from "./Product";

export class Cart {
  products: Product[];
  totalAmount: number;

  constructor() {
    this.products = [];
    this.totalAmount = 0;
  }
}
