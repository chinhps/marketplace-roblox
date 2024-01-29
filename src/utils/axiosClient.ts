import axios from "axios";
import queryString from "query-string";
import { customToast } from "./const";
import { createStandaloneToast } from "@chakra-ui/react";
import { logout } from "./price";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "content-type": "application/json",
  },
  withCredentials: false,
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  async (config) => {
    const requestInterceptor = await import("./crypto");
    return requestInterceptor.default(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    // if (res && res.data) {
    //   return res.data;
    // }
    return res;
  },
  (err) => {
    const { toast } = createStandaloneToast();
    const status = err.response.status;
    if (status === 401) {
      toast({
        status: "error",
        description: "Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục...",
        ...customToast,
      });
      logout();
    }
    if (status === 451) {
      toast({
        status: "warning",
        description: err?.response.data.msg,
        ...customToast,
      });
      logout();
    }
    if (
      status === 404 ||
      status === 402 ||
      status === 422 ||
      status === 403 ||
      status === 400
    ) {
      toast({
        status: "warning",
        description: err?.response.data.msg,
        ...customToast,
      });
    }
    if (typeof err.response !== "undefined") throw err.response.data;
    throw err;
  }
);

export default axiosClient;
