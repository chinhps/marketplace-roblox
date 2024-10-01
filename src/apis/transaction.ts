import {
  IBaseResponse,
  IResponseWithMessage,
} from "@/types/response/base.type";
import {
  ITransactionCreate,
  TransactionListResponse,
} from "@/types/response/transaction.type";
import axiosClient from "@/utils/axiosClient";

export const transactionApi = {
  create: (params: ITransactionCreate) => {
    const url = "/transactions";
    return axiosClient.post<IResponseWithMessage>(url, {
      ...params,
    });
  },
  list: ({
    page,
    filter,
    type,
  }: {
    page: number;
    filter: object;
    type: "price" | "diamond" | "robux";
  }) => {
    const url = "/transactions/" + type;
    return axiosClient.get<IBaseResponse<TransactionListResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
};
