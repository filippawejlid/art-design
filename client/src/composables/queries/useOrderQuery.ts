import { OrderResponse } from "./../../models/apiInterface";
import { useMutation, useQuery } from "vue-query";
import { Order } from "../../models/Order";
import useApi from "../../services/useApi";

const useOrderQuery = (id?: string) => {
  const getOrder = (): Promise<OrderResponse> => {
    return useApi()
      .get(`checkout/get-order/${id}`)
      .then((res) => {
        console.log(res.data, "hej");
        return res.data;
      });
  };
  const postOrder = useMutation((order: Order) => {
    return useApi().post("checkout/post-order", order);
  });

  return {
    ...useQuery("order", getOrder, {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }),
    postOrder,
  };
};

export default useOrderQuery;
