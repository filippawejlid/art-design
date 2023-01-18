import { useMutation, useQuery, useQueryClient } from "vue-query";
import { Product } from "../../models/Product";
import useApi from "../../services/useApi";

const useProductsQuery = () => {
  const queryClient = useQueryClient();

  const getProducts = (): Promise<Product[]> => {
    return useApi()
      .get(`products/getproducts`)
      .then((res) => {
        return res.data.map((p: Product) => new Product(p)) ?? [];
      });
  };

  const editProduct = useMutation(
    (product: Product) => {
      return useApi().post("/admin/edit-product", product);
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  const deleteProduct = useMutation(
    (id: string) => {
      return useApi().get(`/admin/delete-product/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  const addProduct = useMutation(
    (product: Product) => {
      return useApi().post("/admin/add-product", product);
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  return {
    ...useQuery("products", getProducts, {
      refetchOnWindowFocus: false,
    }),
    addProduct,
    editProduct,
    deleteProduct,
  };
};

export default useProductsQuery;
