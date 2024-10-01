import { IQueryForm } from "@/types/form.type";
import {
  IBaseResponse,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { TopRechargeListResponse } from "@/types/response/topRecharge.type";
import axiosClient from "@/utils/axiosClient";

export const topRecharge = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/top-recharge";
    return axiosClient.get<IBaseResponse<TopRechargeListResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  delete: (id: number) => {
    const url = "/top-recharge/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};

export const topRechargeVirtual = {
  get: (id: number) => {
    const url = "/top-recharge-virtual/" + id;
    return axiosClient.get<IBaseResponseDetail<TopRechargeListResponse>>(url);
  },
  create: (params: object) => {
    const url = "/top-recharge-virtual/upsert";
    return axiosClient.post<IResponseWithMessage>(url, { ...params });
  },
  delete: (id: number) => {
    const url = "/top-recharge-virtual/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};
