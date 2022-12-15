import { useQuery } from "vue-query";
import { ProductResponse } from "../../models/apiInterface";
import { Product } from "../../models/Product";
import axios from "axios";

const useProductsQuery = () => {
  const getProducts = (): Promise<Product[]> => {
    return axios
      .get<ProductResponse[]>(`Product/GetProducts/`)
      .then((res) => res.data.map((p) => new Product(p)) ?? []);
  };

  return {
    ...useQuery("products", getProducts, {
      refetchOnWindowFocus: false,
    }),
  };
};

export default useProductsQuery;
