import { useQuery } from "vue-query";
import { ProductResponse } from "../../models/apiInterface";
import { Product } from "../../models/Product";
import axios from "axios";
import useApi from "../../services/useApi";

const useProductsQuery = () => {
  const getProducts = (): Promise<Product[]> => {
    return useApi()
      .get(`products/getproducts`)
      .then((res) => {
        console.log(res.data);

        return res.data.map((p: Product) => new Product(p)) ?? [];
      });
  };

  return {
    ...useQuery("products", getProducts, {
      refetchOnWindowFocus: false,
    }),
  };
};

export default useProductsQuery;
