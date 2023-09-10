import { IQueryForm } from "@/types/form.type";
import {
  IBaseResponse,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { IShopList } from "@/types/response/shop.type";
import axiosClient from "@/utils/axiosClient";

const shopApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/shop-list";
    return axiosClient.get<IBaseResponse<IShopList>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/shop-list/" + id;
    return axiosClient.get<IBaseResponseDetail<IShopList>>(url);
  },
  create: (dataForm: FormData) => {
    const url = "/shop-list/upsert";
    return axiosClient.post<IResponseWithMessage>(url, dataForm, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};

export default shopApi;
