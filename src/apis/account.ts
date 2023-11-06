import { IQueryForm } from "@/types/form.type";
import { AccountListResponse } from "@/types/response/account.type";
import {
  IBaseResponse,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { IServiceGameRandomCreate } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient";

const accountApi = {
  create: (formDataObject: FormData) => {
    const url = "/accounts/upsert";
    return axiosClient.post<IResponseWithMessage>(url, formDataObject, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  list: ({ page, filter }: IQueryForm) => {
    const url = "/accounts";
    return axiosClient.get<IBaseResponse<AccountListResponse>>(url, {
      params: {
        page,
        game_key: "ACCOUNT",
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/accounts/" + id;
    return axiosClient.get<IBaseResponseDetail<AccountListResponse>>(url);
  },
  delete: (id: number) => {
    const url = "/accounts/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};

const randomApi = {
  create: (data: IServiceGameRandomCreate) => {
    const url = "/accounts/create-random";
    return axiosClient.post<IResponseWithMessage>(url, { ...data });
  },
  list: ({ page, filter }: IQueryForm) => {
    const url = "/accounts";
    return axiosClient.get<IBaseResponse<AccountListResponse>>(url, {
      params: {
        page,
        game_key: "RANDOM",
        ...filter,
      },
    });
  },
  delete: (id: number) => {
    const url = "/accounts/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};

const boxApi = {
  create: (data: object) => {
    const url = "/accounts/create-box";
    return axiosClient.post<IResponseWithMessage>(url, { ...data });
  },
};

export { accountApi, randomApi, boxApi };
