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
    this.products = setQuantity(resp?.products) ?? [new Product()];
    this.totalAmount = resp?.totalAmount ?? 0;
  }
}

export const setQuantity = (products?: Product[]) => {
  if (!products) return;

  let unique: Product[] = [];
  products.forEach((element) => {
    if (!unique.find((e) => e._id === element._id)) {
      element.quantity = 1;
      unique.push(element);
    } else {
      console.log("är vi här");

      const foundE = unique.find((e) => e._id === element._id);
      if (!foundE) return;
      element.quantity = foundE?.quantity + 1;
      const i = unique.findIndex((p) => p._id === element._id);
      unique.splice(i, 1, element);
    }
  });
  console.log(unique);

  return unique;
};
