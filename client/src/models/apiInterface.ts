import { Product } from "./Product";

export interface ProductResponse {
  name: string;
  _id: string;
  img: string;
  price: number;
  stock: number;
  description: string;
}
export interface OrderResponse {
  _id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  products: Product[];
  totalAmount: number;
}

export interface OrdersResponse {
  _id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  products: Product[];
  totalAmount: number;
}
