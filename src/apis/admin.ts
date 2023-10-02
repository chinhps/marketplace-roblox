import { IQueryForm } from "@/types/form.type";
import { AdminResponse } from "@/types/response/admin.type";
import {
  IBaseResponse,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import axiosClient from "@/utils/axiosClient";

export const adminApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/admins";
    return axiosClient.get<IBaseResponse<AdminResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/admins/" + id;
    return axiosClient.get<IBaseResponseDetail<AdminResponse>>(url);
  },
  create: (data: object) => {
    const url = "/admins/upsert";
    return axiosClient.post<IResponseWithMessage>(url, data);
  },
  delete: (id: number) => {
    const url = "/admins/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};
