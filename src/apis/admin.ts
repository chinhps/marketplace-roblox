import { IQueryForm } from "@/types/form.type";
import { AdminResponse } from "@/types/response/admin.type";
import { IBaseResponse, IBaseResponseDetail } from "@/types/response/base.type";
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
};
