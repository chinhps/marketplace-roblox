import { InputsBuyRobux, InputsWithdrawDiamond } from "@/types/form.type";
import { IResponseWithMessage } from "@/types/response/base.type";
import axiosClient from "@/utils/axiosClient";

export const withdrawApi = {
  diamond: ({ type_withdraw, id_game }: InputsWithdrawDiamond) => {
    const url = "/api/profile/withdraw/diamond";
    return axiosClient.post<IResponseWithMessage>(url, {
      type_withdraw,
      id_game,
    });
  },
  buyRobux: ({ type_withdraw, linkpass }: InputsBuyRobux) => {
    const url = "/api/profile/withdraw/buy_robux";
    return axiosClient.post<IResponseWithMessage>(url, {
      type_withdraw,
      linkpass,
    });
  },
  robux: ({ type_withdraw, linkpass }: InputsBuyRobux) => {
    const url = "/api/profile/withdraw/robux";
    return axiosClient.post<IResponseWithMessage>(url, {
      type_withdraw,
      linkpass,
    });
  },
};
