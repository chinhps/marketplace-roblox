import { IQueryForm } from "@/types/form.type";
import {
  IBaseResponse,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { WithdrawResponse } from "@/types/response/withdrawLimit.type";
import axiosClient from "@/utils/axiosClient";

export const withdrawLimitApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/withdrawal-limits";
    return axiosClient.get<IBaseResponse<WithdrawResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/withdrawal-limits/" + id;
    return axiosClient.get<IBaseResponseDetail<WithdrawResponse>>(url);
  },
  upsert: (data: object) => {
    const url = "/withdrawal-limits/upsert";
    return axiosClient.post(url, { ...data });
  },
  delete: (id: number) => {
    const url = "/withdrawal-limits/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};
