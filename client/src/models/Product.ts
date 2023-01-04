import { ProductResponse } from "./apiInterface";

export class Product {
  name: string;
  _id: string;
  img: string;
  price: number;
  stock: number;
  quantity: number;
  description: string;

  constructor(resp?: ProductResponse) {
    this.name = resp?.name ?? "";
    this._id = resp?._id ?? "";
    this.img = resp?.img ?? "";
    this.price = resp?.price ?? 0;
    this.stock = resp?.stock ?? 0;
    this.quantity = 1;
    this.description = resp?.description ?? "";
  }
}
