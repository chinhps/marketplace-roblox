import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    if (typeof err.response !== "undefined")
      throw err.response.data;
    throw err;
  },
);

export default axiosClient;
