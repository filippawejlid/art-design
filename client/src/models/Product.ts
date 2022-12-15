import { ProductResponse } from "./apiInterface";

export class Product {
  name: string;
  id: string;
  img: string;
  price: number;
  stock: number;
  quantity: number;
  description: string;

  constructor(resp?: ProductResponse) {
    this.name = resp?.name ?? "";
    this.id = resp?.id ?? "";
    this.img = resp?.img ?? "";
    this.price = resp?.price ?? 0;
    this.stock = resp?.stock ?? 0;
    this.quantity = 0;
    this.description = resp?.description ?? "";
  }
}
