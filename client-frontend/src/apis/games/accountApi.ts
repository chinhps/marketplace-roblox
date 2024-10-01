import { IBaseResponse, IBaseResponseDetail, IResponseWithMessage } from "@/types/response/base.type";
import { IAccountService } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient";

export const accountApi = {
    accountDetail: (id: number | undefined) => {
        const url = "/api/accounts/detail/" + id;
        return axiosClient.get<IBaseResponseDetail<IAccountService>>(url);
    },
    recommends: () => {
        const url = "/api/accounts/recommends";
        return axiosClient.get<IBaseResponse<IAccountService>>(url);
    },
    buyAccount: (id: number) => {
        const url = "/api/accounts/buy_account";
        return axiosClient.post<IResponseWithMessage>(url, {
            id
        });
    }
}