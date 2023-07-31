import { IBaseResponse } from "@/types/response/base.type";
import { IPurchaseHistory, IRechargeHistory, IServiceHistory, IWithdrawHistory } from "@/types/response/history.type";
import axiosClient from "@/utils/axiosClient";

const baseUrl = "/api/profile/history";

const profileApi = {
    historyPurchase: () => {
        const api = baseUrl + '/purchases';
        return axiosClient.get<IBaseResponse<IPurchaseHistory>>(api);
    },
    historyService: () => {
        const api = baseUrl + '/services';
        return axiosClient.get<IBaseResponse<IServiceHistory>>(api);
    },
    historyRecharge: () => {
        const api = baseUrl + '/recharge';
        return axiosClient.get<IBaseResponse<IRechargeHistory>>(api);
    },
    historyWithdraw: () => {
        const api = baseUrl + '/withdraw';
        return axiosClient.get<IBaseResponse<IWithdrawHistory>>(api);
    }
}

export default profileApi;