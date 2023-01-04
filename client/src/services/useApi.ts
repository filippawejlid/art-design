import Api from "./Api";

const useApi = () => {
  const get = (url: string) => {
    return Api().get(url);
  };

  const post = (url: string, data: any) => {
    return Api().post(url, data);
  };

  const del = (url: string, data: any) => {
    return Api().delete(url, data);
  };

  const put = (url: string, data: any) => {
    return Api().put(url, data);
  };

  return {
    get,
    post,
    del,
    put,
  };
};
export default useApi;
