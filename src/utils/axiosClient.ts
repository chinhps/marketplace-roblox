import axios from 'axios';
import queryString from 'query-string';
import { myDomain } from './version';
import { customToast, token } from './const';
import { createStandaloneToast } from '@chakra-ui/react';
import { logout } from './price';
import CryptoJS from 'crypto-js';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      domain: myDomain(),
    };
  }
  if (config.method === 'get') {
    config.params = {
      ...config.data,
      domain: myDomain()
    }
  }

  if (token()) {
    config.headers.Authorization = 'Bearer ' + token();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

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
        description: "Xác thực thất bại! Vui lòng đăng nhập lại!",
        ...customToast
      });
      logout();
    }
    if (status === 422) {
      toast({
        status: "warning",
        description: err?.response.data.msg,
        ...customToast
      });
      logout();
    }
    if (status === 404 || status === 402) {
      toast({
        status: "warning",
        description: err?.response.data.msg,
        ...customToast
      });
    }
    if (typeof err.response !== "undefined")
      throw err.response.data;
    throw err;
  },
);

export default axiosClient;
