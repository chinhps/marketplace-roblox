import { IQueryForm } from "@/types/form.type";
import {
  IBaseResponse,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { PurchaseResponse } from "@/types/response/history.type";
import axiosClient from "@/utils/axiosClient";

export const purchaseApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/histories/purchases";
    return axiosClient.get<IBaseResponse<PurchaseResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  updateRefund: (id: number, refund: boolean) => {
    const url = "/histories/purchases/" + id;
    return axiosClient.put<IResponseWithMessage>(url, {
      refund: refund,
    });
  },
};
