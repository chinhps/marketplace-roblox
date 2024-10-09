import axios from "axios";
import queryString from "query-string";
import { token } from "./function";
import { createStandaloneToast } from "@chakra-ui/react";
// import CryptoJS from 'crypto-js';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API + "/api123",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  (config) => {
    if (token()) {
      config.headers.Authorization = "Bearer " + token();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
   console.log("import.meta.env.VITE_APP_API", import.meta.env.VITE_APP_API)
    return res;
  },
  (err) => {
    const { toast } = createStandaloneToast();
    const status = err.response.status;
    if (status === 401) {
      toast({
        status: "error",
        description: "Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục...",
      });
    }
    if (status === 403) {
      toast({
        status: "warning",
        description: "Bạn không đủ quyền để thực hiện!",
      });
    }
    if (
      status === 404 ||
      status === 406 ||
      status === 402 ||
      status === 422 ||
      status === 400 ||
      status === 500
    ) {
      toast({
        status: "warning",
        description: err?.response.data.msg,
      });
    }
    if (typeof err.response !== "undefined") throw err.response.data;
    throw err;
  }
);

export default axiosClient;
