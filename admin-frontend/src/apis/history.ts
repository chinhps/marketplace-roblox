import { IQueryForm } from "@/types/form.type";
import {
  IBaseResponse,
  IResponseWithMessage,
} from "@/types/response/base.type";
import {
  PurchaseResponse,
  RechargeResponse,
  ServiceHistoryResponse,
  WithdrawHistoryResponse,
} from "@/types/response/history.type";
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

export const rechargeApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/histories/recharges";
    return axiosClient.get<IBaseResponse<RechargeResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  updateRefund: (id: number, refund: boolean) => {
    const url = "/histories/recharges/" + id;
    return axiosClient.put<IResponseWithMessage>(url, {
      refund: refund,
    });
  },
};

export const serviceHistoryApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/histories/services";
    return axiosClient.get<IBaseResponse<ServiceHistoryResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
};

export const withdrawHistoryApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/histories/withdraw";
    return axiosClient.get<IBaseResponse<WithdrawHistoryResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  updateStatus: (id: number, status: boolean) => {
    const url = "/histories/withdraw/" + id;
    return axiosClient.put<IResponseWithMessage>(url, {
      status,
    });
  },
  downloadRobux: () => {
    const url = "/histories/withdraw/export-robux";
    return axiosClient.post(url, [], { responseType: "blob" });
  },
};
