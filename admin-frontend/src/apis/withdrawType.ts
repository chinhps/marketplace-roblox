import { IBaseResponse } from "@/types/response/base.type";
import { WithdrawTypeResponse } from "@/types/response/withdrawType.type";
import axiosClient from "@/utils/axiosClient";

export const withdrawTypeApi = {
  all: () => {
    const url = "/withdraw-types/all";
    return axiosClient.get<IBaseResponse<WithdrawTypeResponse>>(url);
  },
};
