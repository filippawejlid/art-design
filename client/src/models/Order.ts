import { OrderResponse } from "./apiInterface";
import { Product } from "./Product";
import { Customer } from "./Customer";

export class Order {
  _id: string;
  customer: Customer;
  products: Product[];
  totalAmount: number;
  constructor(resp?: OrderResponse) {
    this._id = resp?._id ?? "";
    this.customer = resp?.customer ?? new Customer();
    this.products = resp?.products ?? [new Product()];
    this.totalAmount = resp?.totalAmount ?? 0;
  }
}
