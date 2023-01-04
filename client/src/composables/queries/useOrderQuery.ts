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
        return new Order(res.data);
      });
  };
  const getAllOrders = (): Promise<OrderResponse> => {
    return useApi()
      .get(`checkout/get-all-orders`)
      .then((res) => {
        console.log("alla ordrar", res.data);
        return res.data.map((p: Order) => new Order(p)) ?? [];
      });
  };
  const postOrder = useMutation((order: Order) => {
    return useApi().post("checkout/post-order", order);
  });

  return {
    ...useQuery("order", id ? getOrder : getAllOrders, {
      refetchOnWindowFocus: false,
    }),
    postOrder,
  };
};

export default useOrderQuery;
