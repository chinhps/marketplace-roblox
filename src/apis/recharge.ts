import { InputsRecharge } from "@/types/form.type";
import { IBaseResponse } from "@/types/response/base.type";
import { ITopRecharge } from "@/types/response/recharge.type";
import axiosClient from "@/utils/axiosClient";
import { ucwords } from "@/utils/price";

const rechargeApi = {
  topRecharge: (time: "present" | "last-month") => {
    const url = "/api/information/top-recharge";
    return axiosClient.get<IBaseResponse<ITopRecharge>>(url, {
      params: {
        time,
      },
    });
  },
  recharge: ({ card_type, amount, serial, code }: InputsRecharge) => {
    const url = "/api/profile/recharge";
    return axiosClient.post(url, {
      card_type: ucwords(card_type),
      amount: amount,
      pin: code,
      serial: serial,
      h: window.navigator.webdriver,
    });
  },
};

export default rechargeApi;
