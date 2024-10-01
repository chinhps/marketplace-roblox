import { IBaseResponse } from "@/types/response/base.type";
import {
  IPurchaseHistory,
  IRechargeHistory,
  IServiceHistory,
  IWithdrawHistory,
} from "@/types/response/history.type";
import axiosClient from "@/utils/axiosClient";

const baseUrl = "/api/profile/history";
interface IQueryForm {
  page: number;
}
const profileApi = {
  historyPurchase: ({ page }: IQueryForm) => {
    const api = baseUrl + "/purchases";
    return axiosClient.get<IBaseResponse<IPurchaseHistory>>(api, {
      params: {
        page,
      },
    });
  },
  historyService: ({ page }: IQueryForm) => {
    const api = baseUrl + "/services";
    return axiosClient.get<IBaseResponse<IServiceHistory>>(api, {
      params: {
        page,
      },
    });
  },
  historyRecharge: ({ page }: IQueryForm) => {
    const api = baseUrl + "/recharge";
    return axiosClient.get<IBaseResponse<IRechargeHistory>>(api, {
      params: {
        page,
      },
    });
  },
  historyWithdraw: ({ page }: IQueryForm) => {
    const api = baseUrl + "/withdraw";
    return axiosClient.get<IBaseResponse<IWithdrawHistory>>(api, {
      params: {
        page,
      },
    });
  },
};

export default profileApi;
