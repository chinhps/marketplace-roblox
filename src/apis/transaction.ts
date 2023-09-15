import { IResponseWithMessage } from "@/types/response/base.type";
import { ITransactionCreate } from "@/types/response/transaction.type";
import axiosClient from "@/utils/axiosClient";

export const transactionApi = {
  create: (params: ITransactionCreate) => {
    const url = "/transactions";
    return axiosClient.post<IResponseWithMessage>(url, {
      ...params,
    });
  },
};
