import { IBaseResponse } from "@/types/response/base.type";
import { ITopRecharge } from "@/types/response/recharge.type";
import axiosClient from "@/utils/axiosClient"

const rechargeApi = {
    topRecharge: (time: "present" | "last-month") => {
        const url = "/api/information/top-recharge";
        return axiosClient.get<IBaseResponse<ITopRecharge>>(url, {
            data: {
                time
            }
        });
    },
}

export default rechargeApi;