import {
    IBaseResponse,
    IResponseWithMessage,
} from "@/types/response/base.type";
import { IUpdateStatus, WithdrawPartnerResponse } from "@/types/response/withdraw.type";
import axiosClient from "@/utils/axiosClient";

export const withdrawApi = {
    list: ({ page }: { page: number }) => {
        const url = "/withdrawals-partner";
        return axiosClient.get<IBaseResponse<WithdrawPartnerResponse>>(url, {
            params: {
                page,
            },
        });
    },
    create: (data: object) => {
        const url = "/withdrawals-partner/create-transaction";
        return axiosClient.post<IResponseWithMessage>(url, { ...data });
    },
    updateStatus: (data: IUpdateStatus) => {
        const url = "/withdrawals-partner/status-update";
        return axiosClient.post<IResponseWithMessage>(url, { ...data });
    },
};
